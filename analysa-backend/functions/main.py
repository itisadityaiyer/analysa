# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn, storage_fn, options
from firebase_admin import initialize_app, storage

from pandas import DataFrame, read_csv, to_datetime
from numpy import sqrt
from scipy.stats import t
from json import dumps


import io

app = initialize_app()

DEFAULT_TARGET_COLUMNS = [
    "watch_time",
    "pause_count",
    "avg_watch_time_per_video",
    "Webpage_clicks_per_session",
    "Videos_completed_per_session",
]


def generate_confidence_intervals(
    csv_file,
    treatment_group,
    control_group,
    start_date=None,
    end_date=None,
    confidence_level=0.95,
    target_columns=DEFAULT_TARGET_COLUMNS,
):
    # Load the dataset from the CSV file
    data = read_csv(csv_file)

    # Rename the 'date' column to 'ds'
    data.rename(columns={"date": "ds"}, inplace=True)

    # Convert the 'ds' column to datetime format
    data["ds"] = to_datetime(data["ds"])

    # Filter the data for the treatment and control groups
    treatment_data = data[data["test_group"] == treatment_group]
    control_data = data[data["test_group"] == control_group]

    # Apply date filters if provided
    if start_date:
        start_date = to_datetime(start_date, format="%Y-%m-%d")
        end_date = to_datetime(end_date, format="%Y-%m-%d")

        treatment_data = treatment_data[
            (treatment_data["ds"] >= start_date) & (treatment_data["ds"] <= end_date)
        ]
        control_data = control_data[
            (control_data["ds"] >= start_date) & (control_data["ds"] <= end_date)
        ]

    # Calculate the mean for each target column in the treatment and control groups
    treatment_means = treatment_data[target_columns].mean()
    control_means = control_data[target_columns].mean()

    # Calculate the percentage change for each target column
    percentage_change = (treatment_means - control_means) / control_means * 100

    # Calculate the sample size for treatment and control groups
    treatment_size = len(treatment_data)
    control_size = len(control_data)

    # Calculate the confidence interval for each target column
    confidence_intervals = {}
    for column in target_columns:
        # Calculate the standard deviation for the treatment and control groups
        treatment_std = treatment_data[column].std()
        control_std = control_data[column].std()

        # Calculate the standard error of the difference in means
        se = sqrt(
            (treatment_std**2 / treatment_size) + (control_std**2 / control_size)
        )

        # Calculate the degrees of freedom
        df = treatment_size + control_size - 2

        # Calculate the critical value for the specified confidence level
        critical_value = t.ppf((1 + confidence_level) / 2, df)

        # Calculate the margin of error
        margin_of_error = critical_value * se

        # Calculate the confidence interval for the percentage change
        lower_bound = percentage_change[column] - margin_of_error
        upper_bound = percentage_change[column] + margin_of_error
        midpoint = (lower_bound + upper_bound) / 2

        confidence_intervals[column] = {
            "lower_bound": lower_bound,
            "upper_bound": upper_bound,
            "midpoint": midpoint,
        }

    return confidence_intervals


@https_fn.on_request(
    timeout_sec=60,
    memory=options.MemoryOption.GB_1,
    cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    ),
)
def request_confidence_intervals(req: https_fn.Request) -> https_fn.Response:
    comparisonA = req.args.get("comparisonA")
    comparisonB = req.args.get("comparisonB")
    startDate = req.args.get("startDate")
    endDate = req.args.get("endDate")

    bucket = storage.bucket("deep-lore-388606.appspot.com")
    blob = bucket.blob("youtube_synthetic_data.csv")
    csv = blob.download_as_bytes()

    intervals = generate_confidence_intervals(
        csv_file=io.BytesIO(csv),
        treatment_group=comparisonA,
        control_group=comparisonB,
        start_date=startDate,
        end_date=endDate,
        target_columns=DEFAULT_TARGET_COLUMNS,
    )
    return https_fn.Response(dumps(intervals))


@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    ),
)
def ping_test(req: https_fn.Request) -> https_fn.Response:
    print("ping test")
    return https_fn.Response("ping test")

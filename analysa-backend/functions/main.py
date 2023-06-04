# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn, storage_fn, options
from firebase_admin import initialize_app, storage

from pandas import DataFrame, read_csv
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
    csv_file, target_columns, treatment_group, control_group, confidence_level=0.95
):
    # Load the dataset from the CSV file
    data = read_csv(csv_file)

    # Filter the data for the treatment and control groups
    treatment_data = data[data["test_group"] == treatment_group]
    control_data = data[data["test_group"] == control_group]

    # Calculate the mean and standard deviation for each target column in the treatment group
    treatment_means = treatment_data[target_columns].mean()
    treatment_std = treatment_data[target_columns].std()

    # Calculate the mean and standard deviation for each target column in the control group
    control_means = control_data[target_columns].mean()
    control_std = control_data[target_columns].std()

    # Calculate the sample size for each group
    treatment_size = len(treatment_data)
    control_size = len(control_data)

    # Calculate the confidence interval for each target column
    confidence_intervals = {}
    for column in target_columns:
        # Calculate the standard error of the difference in means
        se = sqrt(
            (treatment_std[column] ** 2 / treatment_size)
            + (control_std[column] ** 2 / control_size)
        )

        # Calculate the degrees of freedom
        df = treatment_size + control_size - 2

        # Calculate the critical value for the specified confidence level
        critical_value = t.ppf((1 + confidence_level) / 2, df)

        # Calculate the margin of error
        margin_of_error = critical_value * se

        # Calculate the confidence interval
        lower_bound = (
            treatment_means[column] - control_means[column]
        ) - margin_of_error
        upper_bound = (
            treatment_means[column] - control_means[column]
        ) + margin_of_error
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
    bucket = storage.bucket("deep-lore-388606.appspot.com")
    blob = bucket.blob("youtube_synthetic_data.csv")
    csv = blob.download_as_string()
    intervals = generate_confidence_intervals(
        csv_file=io.BytesIO(csv),
        target_columns=DEFAULT_TARGET_COLUMNS,
        treatment_group="test",
        control_group="control",
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

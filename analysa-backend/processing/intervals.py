from pandas import read_csv
from numpy import sqrt
from scipy.stats import t

DEFAULT_TARGET_COLUMNS = [
    "watch_time",
    "pause_count",
    "avg_watch_time_per_video",
    "Webpage_clicks_per_session",
    "Videos_completed_per_session",
]


def generate_confidence_intervals_original(
    csv_file, target_columns=DEFAULT_TARGET_COLUMNS, confidence_level=0.95
):
    # Load the dataset from the CSV file
    data = read_csv(csv_file)

    # Group the data by 'test_group' and calculate the mean for each target column
    grouped_data = data.groupby("test_group")[target_columns].mean()

    # Get the mean and standard deviation of the test and control groups for each target column
    test_means = grouped_data.loc["test"]
    control_means = grouped_data.loc["control"]
    test_std = data.loc[data["test_group"] == "test", target_columns].std()
    control_std = data.loc[data["test_group"] == "control", target_columns].std()

    # Calculate the sample size for each group
    test_size = len(data[data["test_group"] == "test"])
    control_size = len(data[data["test_group"] == "control"])

    # Calculate the confidence interval for each target column
    confidence_intervals = {}
    for column in target_columns:
        # Calculate the standard error of the difference in means
        se = sqrt(
            (test_std[column] ** 2 / test_size)
            + (control_std[column] ** 2 / control_size)
        )

        # Calculate the degrees of freedom
        df = test_size + control_size - 2

        # Calculate the critical value for the specified confidence level
        critical_value = t.ppf((1 + confidence_level) / 2, df)

        # Calculate the margin of error
        margin_of_error = critical_value * se

        # Calculate the confidence interval
        lower_bound = (test_means[column] - control_means[column]) - margin_of_error
        upper_bound = (test_means[column] - control_means[column]) + margin_of_error
        midpoint = (lower_bound + upper_bound) / 2

        confidence_intervals[column] = {
            "lower_bound": lower_bound,
            "upper_bound": upper_bound,
            "midpoint": midpoint,
        }

    return confidence_intervals


def generate_confidence_intervals(
    csv_file,
    treatment_group,
    control_group,
    confidence_level=0.95,
    target_columns=DEFAULT_TARGET_COLUMNS,
):
    # Load the dataset from the CSV file
    data = read_csv(csv_file)

    print(data.head())

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

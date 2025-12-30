There are three main types of datasets to consider when working with evals.

## Dev Dataset

The first is your dev dataset, which contains the evals you run with every local change. Keep this dataset small to ensure your dev evals run quickly.

Your dev setup should focus on the most challenging evals or those you're currently prioritizing. Aim for about 5-10 evals in this dataset.

## CI Dataset

Next is your CI dataset, which ensures that merged code continues to pass evals. This runs less frequently than the dev setup but still executes with every commit.

This dataset should be more comprehensive but not overwhelming. It shouldn't take more than 15 minutes to run.

Include evals that have been in your dev dataset over the past few weeks, plus some "golden" test cases to verify your system is working as expected.

## Regression Dataset

Finally, there's the regression dataset. This is your largest dataset, containing all the evals you want to track over time.

This might include 500 to 1,000 evals. Run these on a schedule - perhaps daily or every few days - to provide benchmarks for tracking whether your application is improving over time.

Here's a table to help you visualize this:

| Dataset Type | Size                     | Frequency                | Purpose                                                                                 |
| ------------ | ------------------------ | ------------------------ | --------------------------------------------------------------------------------------- |
| Dev          | Small (5-10 evals)       | Every local change       | Focus on hardest problems or current priorities                                         |
| CI           | Medium                   | Every commit             | Ensure merged code maintains quality, includes recent dev evals and "golden" test cases |
| Regression   | Large (500-1,000+ evals) | Scheduled (daily/weekly) | Track long-term performance, comprehensive testing                                      |

## Moving Between Datasets

Evals can move between these different zones as needed. An eval might start in dev, then move to CI where it remains for a while.

When an eval consistently passes, you might move it to regression for less frequent testing - perhaps daily or weekly.

Or if an eval in the regression set starts failing frequently, you might move it back to dev to focus on fixing it.

This is how you should think about datasets when working with evals: dev, CI, and regression.

Thank you for watching, and I will see you in the next one.

## Steps To Complete

Nothing to do here! For further reading, check out [this article](https://www.aihero.dev/what-are-evals) on AI Hero.

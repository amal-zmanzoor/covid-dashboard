import pandas as pd

# Load the dataset
df = pd.read_csv('december.csv')

# Ensure that you always get the same random rows for reproducibility
# You can remove 'random_state=1' if you want different random samples each time
sampled_df = df.sample(n=1000, random_state=1)

# Save the sampled dataframe to a new CSV, keeping the index to False
sampled_df.to_csv('december_short.csv', index=False)

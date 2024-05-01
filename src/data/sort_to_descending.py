import pandas as pd
import json

import pandas as pd
import json

# Load the dataset from a JSON file
df = pd.read_json('word_freq_list_january_short.json')

# Sort the DataFrame by 'value' to get the highest frequencies
sorted_data = df.sort_values(by='value', ascending=False)

# Select the top 20 words with the highest frequencies
top_20_words = sorted_data.head(20)

# Save the top 20 words into a JSON file
top_20_words.to_json('top_20_freq_january.json', orient='records', lines=True)

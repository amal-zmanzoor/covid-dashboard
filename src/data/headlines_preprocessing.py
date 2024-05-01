import pandas as pd
from collections import Counter
import re
import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Downloading the stopwords package 
nltk.download('punkt')
nltk.download('stopwords')

# Load the CSV file into a DataFrame
df = pd.read_csv('december_short.csv')

# Consider only the headlines column for the word cloud
# all_headlines = ' '.join(df['Story Heading'].tolist())
all_headlines = ' '.join(df['Story Excerpt'].dropna().astype(str).tolist())

# Convert to lowercase to maintain consistency
all_headlines = all_headlines.lower()

# Remove punctuation and digits
all_headlines = re.sub(r'[\d\W]+', ' ', all_headlines)

# Tokenization
tokens = word_tokenize(all_headlines)

# Remove stopwords
stop_words = set(stopwords.words('english'))

# Add custom words to stop words list
custom_stopwords = {'pakistan', 'pakistani'}
stop_words = stop_words.union(custom_stopwords)

# Remove stopwords 
tokens = [word for word in tokens if word not in stop_words]

# Count word frequency
word_freq = Counter(tokens)

# Convert Counter to a list of dictionaries for ECharts
word_freq_list = [{'name': word, 'value': count} for word, count in word_freq.items()]

# Output the result to a JSON file
# Use the json library to write the list to a file
# Change the file name according to which month is being processed
with open('word_freq_list_december_short.json', 'w') as f:
    json.dump(word_freq_list, f)

import json
import pandas as pd

df = pd.DataFrame(columns= ['Drug Name', 'Composition', 'URL'])

with open('response_1.json') as f:
  data = json.load(f)


url = [item['url'] for item in data['data']['schema']['itemListElement']]
drug_name = [item['name'] for item in data['data']['schema']['itemListElement']]
drug_composition = [item['short_composition'] for item in data['data']['skus']]

df['Drug Name'] = drug_name
df['Composition'] = drug_composition
df['URL'] = url
print(df)

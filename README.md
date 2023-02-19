# Scripts for Zillow and others

## Parse JSON and Output CSV

### Prerequisite

```sh
brew install deno
```

### Step

1. Copy the _Response_ of the query `https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=` from browser and paste it to _GetSearchPageState.json_.
2. Run the script.

   ```sh
   deno run -A main.ts
   ```

3. Open _result.csv_

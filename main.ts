const stateJSON = JSON.parse(
  await Deno.readTextFile("GetSearchPageState.json"),
);
const searchResults = stateJSON.cat1.searchResults;
let results = [];
if (searchResults.hasOwnProperty("listResults")) {
  results = searchResults.listResults;
} else if (searchResults.hasOwnProperty("mapResults")) {
  results = searchResults.mapResults;
} else {
  console.log("no`listResults` and `mapResults`; check the json payload");
  Deno.exit;
}

const homeInfoArray = results
  .filter((e) => e.hdpData?.homeInfo)
  .map((e) => e.hdpData.homeInfo);
const csv = homInfoArrayToCSV(homeInfoArray);
await Deno.writeTextFile("result.csv", csv);

// helpers

function objectWithMostKeys(aa: any[]) {
  let keyNum = 0, obj = {};
  for (const a of aa) {
    const num = Object.keys(a).length;
    if (num > keyNum) {
      keyNum = num;
      obj = a;
    }
  }
  return obj;
}

function homInfoArrayToCSV(aa: any[]) {
  const keys = Object.keys(objectWithMostKeys(aa));
  let result = [keys.toString()];

  for (const a of aa) {
    const newA = [];
    for (const key of keys) {
      if (a.hasOwnProperty(key)) {
        let value = a[key];
        if (typeof (value) === "string" && value.includes(",")) {
          value = `"${value}"`;
        }
        newA.push(value);
      } else {
        newA.push("n/a");
      }
    }
    result.push(newA.toString());
  }

  return result.join("\n");
}

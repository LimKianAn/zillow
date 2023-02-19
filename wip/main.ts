const url = Deno.args[0];
console.log("url", url);

const resp = await fetch(`${url}`, {
  "headers": {
    "accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language":
      "en-US,en;q=0.9,en-GB;q=0.8,en-GB-oxendict;q=0.7,de;q=0.6,de-DE;q=0.5",
    "cache-control": "max-age=0",
    "sec-ch-ua":
      '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
  },
  "referrerPolicy": "unsafe-url",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include",
});
const text = await resp.text();

let re = /<meta name="description" content="(.*?)>/;
const content = text.match(re)?.[1];

re = /\$(.*?)\./;
const listPrice = content?.match(re)?.[1];
console.log("list price", listPrice);

re = /for \$(.*?)\./;
const sold = content?.match(re)?.[1];
console.log("sold", sold);

re = /Rent Zestimate [\w ]*\$(.*?)\/mo,/;
const rent = text.match(re)?.[1];
console.log("rent", rent);

re = /\\"taxPaid\\":(.*?),/;
const propertyTaxesPerYear = text.match(re)?.[1];
console.log("property taxes per year", propertyTaxesPerYear);

re = /\\"hoaFee\\":(\d*?),/;
const hoa = text.match(re)?.[1];
console.log("hoa", hoa);

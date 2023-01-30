# What is Number2Words?

Number2Words is an API that alloes you to Convert any digits number to the equivalent words, fo example
> (8543.21 in digits) will be (eight thousand, five hundred and forty-three $ and twenty-one ¢ in words).

[![CircleCI](https://circleci.com/gh/egy1st/Number2Words/tree/master.svg?style=shield)](https://circleci.com/gh/egy1st/Number2Words/tree/master) [![codecov](https://codecov.io/gh/egy1st/Number2Words/branch/master/graph/badge.svg?token=26Z0MRJI07)](https://codecov.io/gh/egy1st/Number2Words)
[![Swagger Validator](https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fnumber2words.readme.io%2Fopenapi%2F6206ef8046f62d0080f16b8f)](https://number2words.readme.io/openapi/6206ef8046f62d0080f16b8f)
[![Documentation Status](https://readthedocs.org/projects/number2words-docs/badge/?version=latest)](https://number2words-docs.readthedocs.io/en/latest/?badge=latest)

![Number2Words 13 languages](https://raw.githubusercontent.com/egy1st/images/main/number2words/13_languages.png)

Digits number up to 999,999,999.998.99 can be converted to words in 13 languages so far:

- Arabic
- English
- French
- German
- Spanish
- Italian
- Portuguese
- Russian
- Persian
- Turkish
- Korean
- Chinese Simplified
- Chinese Traditional

![Number2Words Demo](https://raw.githubusercontent.com/egy1st/images/main/number2words/demo.webp)

# Shall We Start
Just click me and see how am I working
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=en&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=ar&locale=egy
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=fr&locale=eur
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=de&locale=eur
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=es&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=pt&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=it&locale=eur
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=ru&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=fa&locale=egy
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=tr&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=ko&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=zh_cn&locale=usa
- https://api.zerobytes.one/number2words/v1/?number=123456.78&language=zh_tw&locale=usa

# Great For Banks Billing

Number2Words is useful when making financial reports, generating bills, and printing checks. There’s no need to type in
each number – just pass your digits to our perfect API portal and Number2Words will do the rest for you. Since encoding
is automatic, there is no room for fraud or human error.

# All Languages Example

> For example thr number $7431285.46 will be rendered into 13 languages as following:

![Number2Words Languages 01](https://raw.githubusercontent.com/egy1st/images/main/number2words/languages01.png)

![Number2Words Languages 01](https://raw.githubusercontent.com/egy1st/images/main/number2words/languages02.png)

# Currency Options

Number2Words sets the currency depending on the language you choose. The default currency is dollar and cents. anyway,
You can customize the currency sign or text i.e dollar/$ and cent/¢. The parameter array, if specified should follows
the following order. First: sign/word for single currency, then sign/word for plural currencies, following by sign/word
for single unit-ofcurency and finally sign/word for plural unitof-currency'

# Interact with the API

you may interact with the API via this the folloing link .You will be able to change number, language, type-of-output
and see changes on time.

[![interact with me at rapidapi.com](https://img.shields.io/badge/test%20me%20at-rapidapi.com-green)](https://rapidapi.com/egy1st/api/number2words4) [![interact with me at readme.io](https://img.shields.io/badge/test%20me%20at-readme.io-blue)](https://number2words.readme.io/reference/number2words) [![interact with me at swaggerhub.com](https://img.shields.io/badge/test%20me%20at-swaggerhub.com-yellowgreen)](https://app.swaggerhub.com/apis/ZeroBytes/Number2Words/1.0) [![interact with me at zerobytes.one](https://img.shields.io/badge/interact-with%20me-orange)](https://demo.zerobytes.one/number2words/)

# Language ID

| Language | Arabic | English | French | German | Italian | Spanish | Portuguese | 
| -------- |------- |-------- |------- |------- |-------- |-------- |----------- |
| ID       | ar     | en      | fr     | gr     | it      | es      | pt         |

| Language |  Russian | Turkish | Persian | Korean  | Chinese Simplified | Chinese Traditional |
| -------- |------- |---------- |-------- |-------- | ------------------ | ------------------- |
| ID       |  ru    | tr        | fa      | ko      | zh_cn              | zh_tw               |

# How to call the API

### PHP

```php
<?php

$curl = curl_init();

$number = 98765432.10 ;
$language = 'en' ;

curl_setopt_array($curl, [
	CURLOPT_URL => "https://number2words4.p.rapidapi.com/v1/?number=$number&language=$language",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"accept-charset: utf-8",
		"x-rapidapi-host: number2words4.p.rapidapi.com",
		"x-rapidapi-key: 6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}
```

### Python

``` python
import requests

url = "https://number2words4.p.rapidapi.com/v1/"

querystring = {"number":"98765432.10","language":"fr"}

headers = {
    'accept-charset': "utf-8",
    'x-rapidapi-host': "number2words4.p.rapidapi.com",
    'x-rapidapi-key': "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923"
    }

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)
```

### Node.js

``` node.js

var unirest = require("unirest");

var req = unirest("GET", "https://number2words4.p.rapidapi.com/v1/");

req.query({
	"number": "98765432.10",
	"language": "ru"
});

req.headers({
	"accept-charset": "utf-8",
	"x-rapidapi-host": "number2words4.p.rapidapi.com",
	"x-rapidapi-key": "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
```

### Javascript (JQuery)

``` javascript
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://number2words4.p.rapidapi.com/v1/?number=98765432.10&language=ru",
	"method": "GET",
	"headers": {
		"accept-charset": "utf-8",
		"x-rapidapi-host": "number2words4.p.rapidapi.com",
		"x-rapidapi-key": "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923"
	}
};


$.ajax(settings).done(function (response) {
	console.log(response);
});
```

### Go

``` go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://number2words4.p.rapidapi.com/v1/?number=98765432.10&language=ru"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept-charset", "utf-8")
	req.Header.Add("x-rapidapi-host", "number2words4.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))
	}
```

### Java

``` java
HttpResponse<String> response = Unirest.get("https://number2words4.p.rapidapi.com/v1/?number=98765432.10&language=en")
	.header("accept-charset", "utf-8")
	.header("x-rapidapi-host", "number2words4.p.rapidapi.com")
	.header("x-rapidapi-key", "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923")
	.asString();
```

### Ruby

``` ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://number2words4.p.rapidapi.com/v1/?number=98765432.1&language=en")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)
request["accept-charset"] = 'utf-8'
request["x-rapidapi-host"] = 'number2words4.p.rapidapi.com'
request["x-rapidapi-key"] = '6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923'

response = http.request(request)
puts response.read_body
```

### Swift

``` swift
import Foundation

let headers = [
	"accept-charset": "utf-8",
	"x-rapidapi-host": "number2words4.p.rapidapi.com",
	"x-rapidapi-key": "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://number2words4.p.rapidapi.com/v1/?number=98765432.1&language=en")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
	if (error != nil) {
		print(error)
	} else {
		let httpResponse = response as? HTTPURLResponse
		print(httpResponse)
	}
})

dataTask.resume()
```

### C#

``` c#

var client = new RestClient("https://number2words4.p.rapidapi.com/v1/?number=98765432.1&language=en");
var request = new RestRequest(Method.GET);
request.AddHeader("accept-charset", "utf-8");
request.AddHeader("x-rapidapi-host", "number2words4.p.rapidapi.com");
request.AddHeader("x-rapidapi-key", "6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923");
IRestResponse response = client.Execute(request);

```

### C

``` c
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_URL, "https://number2words4.p.rapidapi.com/v1/?number=98765432.1&language=en");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "accept-charset: utf-8");
headers = curl_slist_append(headers, "x-rapidapi-host: number2words4.p.rapidapi.com");
headers = curl_slist_append(headers, "x-rapidapi-key: 6a61bed77cmsh79504697a5aba5cp1b83d2jsn7c6815838923");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

CURLcode ret = curl_easy_perform(hnd);
```

# Add you Language: Contribute

You can contribute tp the project at github to add your mother-tongue language, your contribution will help Number2Words
to be the most comprehensive digits-to-equavilant-language project. I could add 13 languages myself. I just ask you to
add yours, so please [Contribute Now](https://github.com/egy1st/Number2Words)

# ReadMe

I would like to express my sincere gratitude to ReadMe.io for hosting my API for Free on their paid premium plan. This
saved me around 1200$/year
[![ReadMe](https://raw.githubusercontent.com/egy1st/images/main/logo/readme.png)](https://number2words.readme.io/)


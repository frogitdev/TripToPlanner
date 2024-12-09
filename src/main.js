moment.locale('ko')

let jsonData = {}

window.onload = function() {
    // URL 예: http://example.com/?file=data.json

    // Query string에서 파일 경로 가져오기
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // "file" 파라미터 값 읽기
    const jsonDomain = urlParams.get("domain");
    const jsonFile = urlParams.get("file");
    const devMode = urlParams.get("devmode");

    if (jsonDomain) {
        const theURL = devMode ? `http://${jsonDomain}/${jsonFile}` : `https://${jsonDomain}/${jsonFile}`
        // Fetch API로 JSON 파일 읽기
        fetch(theURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // JSON 데이터 파싱
            })
            .then((data) => {
                jsonData = data;
                new Vue(vueContent)
                // 데이터를 활용하는 코드 작성
            })
            .catch((error) => {
                console.error("Error fetching the JSON file:", error);
                window.alert("Error fetching the JSON file")
            });
    } else {
        console.error("No JSON file specified in the query string.");
        window.alert("No JSON file specified in the query string.\nHow to : ?domain=domain&file=file")
    }
}

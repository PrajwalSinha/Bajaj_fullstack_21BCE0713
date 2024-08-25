


export async function POST(req) {
    const { userId, email, rollNumber, jsonInput, selectedOptions } = await req.json();
    console.log({ userId, email, rollNumber, jsonInput, selectedOptions });


    const response = {
        alphabets: "M,B",
        numbers: "1,334,,4",
        highestAlphabet: "z",
    };


    const selectedData = {};
    selectedOptions.forEach(option => {
        selectedData[option.value] = response[option.value];
    });

    return new Response(JSON.stringify(selectedData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
}
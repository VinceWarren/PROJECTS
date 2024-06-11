async function generateDecision(command) {
    const apiKey = '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';

    try {
        const generated = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-0613',
                messages: [
                    { role: 'user', content: command }
                ],
                temperature: 0.50
            })
        });

        if (!generated.ok) {
            throw new Error('Failed to fetch response from the API');
        }

        const data = await generated.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error interacting with the API:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const prompt = ` You are a decision-making AI designed to assist college students with daily activities not just school activies but also fun activities by providing short and direct recommendations. Your purpose is to help users make quick decisions without overthinking.

    Your capabilities include understanding natural language queries related to daily tasks and generating concise responses. Your responses should be straightforward, not exceeding one sentence, and tailored to the context of the query.
    
    Example generated decision:
    "Take a break."or "Go for a walk" or "Take a nap" only I sentences per generetion:

    But dont stick to that examples I want you to generate your own random decisions. `;

    try {
        const button = document.querySelector('.decide-button');
        button.addEventListener('click', async ()=>{
            const generatedResponse = await generateDecision(prompt);
            let result = document.querySelector('.response');
            result.textContent = generatedResponse;
        })
    }
    catch(error){
        console.log(error);
    }
});

let messenger = document.getElementById("messenger");
let github = document.getElementById("github");

messenger.addEventListener('click', ()=>{
    window.location.href = "https://www.facebook.com/vince.6910";
})

github.addEventListener('click', ()=>{
    window.location.href = "https://github.com/VinceWarren";
})
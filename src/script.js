
async function generatePoem(event) {
  event.preventDefault();

  const instructionsInput = document.querySelector(".instructions");
  const prompt = instructionsInput.value;
  const context = "You are a French poet. Write a short poem in French about the following topic";
  const apiKey = "oafbe8035b88726c0e80be71t4409330";
  const poemDiv = document.querySelector(".poem");

  poemDiv.innerHTML = "✿ Generating your poem... ✿";

  try {
    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.answer) {
      const typewriter = new Typewriter(poemDiv, {
        delay: 50,
        cursor: "✿"
      });
      
      typewriter
        .typeString(data.answer)
        .start();
    } else {
      poemDiv.innerHTML = "Sorry, could not generate a poem. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    poemDiv.innerHTML = "Sorry, there was an error generating the poem. Please try again.";
  }
}

document.querySelector("form").addEventListener("submit", generatePoem);

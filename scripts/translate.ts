import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY environment variable");
  console.error("Usage: GEMINI_API_KEY=your-key npx tsx scripts/translate.ts");
  process.exit(1);
}

async function translateMessages(
  messages: Record<string, unknown>,
  targetLang: string,
  targetName: string
): Promise<Record<string, unknown>> {
  const prompt = `Eres un traductor profesional experto. Traduce el siguiente JSON del español al ${targetName}.

Reglas estrictas:
- Conserva TODAS las claves JSON exactamente como están (NO traduzcas las claves)
- Conserva las variables con llaves como {year}, {min}, {max} exactamente
- Conserva las etiquetas HTML como <gradient> exactamente
- NO traduzcas nombres de marca: "Better Call Jon", "Jonathan Vidal"
- NO traduzcas nombres de artistas/venues: "Coldplay", "Palau Sant Jordi", "Primavera Sound", etc.
- Para catalán: usa catalán central estándar
- Mantén el mismo tono: profesional pero cercano
- Devuelve SOLO JSON válido, sin bloques de código markdown ni explicaciones
- Los \\n en los valores deben mantenerse como \\n

JSON a traducir:
${JSON.stringify(messages, null, 2)}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
}

async function main() {
  const messagesDir = path.join(process.cwd(), "messages");
  const esMessages = JSON.parse(
    fs.readFileSync(path.join(messagesDir, "es.json"), "utf-8")
  );

  console.log("Traduciendo al catalán...");
  const caMessages = await translateMessages(esMessages, "ca", "catalán");
  fs.writeFileSync(
    path.join(messagesDir, "ca.json"),
    JSON.stringify(caMessages, null, 2) + "\n"
  );
  console.log("ca.json generado.");

  console.log("Traduciendo al inglés...");
  const enMessages = await translateMessages(esMessages, "en", "inglés");
  fs.writeFileSync(
    path.join(messagesDir, "en.json"),
    JSON.stringify(enMessages, null, 2) + "\n"
  );
  console.log("en.json generado.");

  console.log("\nTraducciones completadas. Revisa los archivos antes de hacer commit.");
}

main().catch(console.error);

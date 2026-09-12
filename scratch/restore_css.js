const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Caminho do log
const logPath = 'C:\\Users\\ULTRA\\.gemini\\antigravity\\brain\\2b7ad4ca-1750-42d9-a035-40c5dc556706\\.system_generated\\logs\\transcript.jsonl';

async function restore() {
    if (!fs.existsSync(logPath)) {
        console.log("Log não encontrado em:", logPath);
        return;
    }

    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lastStyleContent = null;

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            
            // Procurar tool calls de write_to_file ou replace_file_content para style.css
            if (data.tool_calls) {
                for (const call of data.tool_calls) {
                    if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                        const args = call.args || {};
                        const target = args.TargetFile || args.TargetFile || '';
                        if (target.includes('style.css')) {
                            // Se for write_to_file completo
                            if (args.CodeContent) {
                                lastStyleContent = args.CodeContent;
                            }
                        }
                    }
                }
            }
            
            // Também verificar na resposta do planner ou mensagens
            if (data.content && data.content.includes('style.css')) {
                // Tentativa de achar blocos de código
                const matches = data.content.match(/```css\s+([\s\S]*?)```/g);
                if (matches) {
                    for (const match of matches) {
                        const code = match.replace(/```css\s*/, '').replace(/```$/, '');
                        if (code.includes('/*  BlackVoice SaaS - Premium Futuristic Design System') || code.includes('pricing-section')) {
                            if (code.length > 20000) { // css completo
                                lastStyleContent = code;
                            }
                        }
                    }
                }
            }
        } catch (e) {}
    }

    if (lastStyleContent) {
        fs.writeFileSync('C:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css.restored', lastStyleContent);
        console.log("SUCESSO: Salvo style.css recuperado em style.css.restored. Tamanho:", lastStyleContent.length);
    } else {
        console.log("Não foi possível recuperar dos logs.");
    }
}

restore();

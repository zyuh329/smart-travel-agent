const generateBtn = document.getElementById('generateBtn');
const userInput = document.getElementById('userInput');
const agentSection = document.getElementById('agent-flow');
const resultSection = document.getElementById('result');

const agents = [
    { id: 'agent1', name: '需求解析Agent', statusEl: null },
    { id: 'agent2', name: '规划Agent', statusEl: null },
    { id: 'agent3', name: '资源匹配Agent', statusEl: null },
    { id: 'agent4', name: '优化Agent', statusEl: null }
];

agents.forEach(agent => {
    agent.statusEl = document.querySelector(`#${agent.id} .agent-status`);
});

async function runAgentSimulation() {
    const input = userInput.value.trim();
    if (!input) {
        alert('请输入您的旅行需求');
        return;
    }

    generateBtn.disabled = true;
    document.querySelector('.btn-text').style.display = 'none';
    document.querySelector('.btn-loading').style.display = 'inline';

    agentSection.style.display = 'block';
    resultSection.style.display = 'none';
    
    agentSection.scrollIntoView({ behavior: 'smooth' });

    for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        const card = document.getElementById(agent.id);
        
        card.classList.add('active');
        card.classList.remove('completed');
        agent.statusEl.textContent = '处理中...';
        agent.statusEl.className = 'agent-status processing';
        
        await delay(1500);
        
        card.classList.remove('active');
        card.classList.add('completed');
        agent.statusEl.textContent = '已完成 ✓';
        agent.statusEl.className = 'agent-status completed';
        
        if (i < agents.length - 1) {
            await delay(500);
        }
    }

    await delay(800);
    
    agentSection.style.display = 'none';
    resultSection.style.display = 'block';
    
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    generateBtn.disabled = false;
    document.querySelector('.btn-text').style.display = 'inline';
    document.querySelector('.btn-loading').style.display = 'none';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

generateBtn.addEventListener('click', runAgentSimulation);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        runAgentSimulation();
    }
});
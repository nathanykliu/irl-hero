import app from '../App.js';
import * as PIXI from 'pixi.js';

export async function createGoalsModal() {

    // create the background
    let bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.5);
    bg.drawRect(0, 0, app.screen.width, app.screen.height);
    bg.endFill();
    app.stage.addChild(bg);

    // create a modal container
    let modal = new PIXI.Container();
    modal.x = app.screen.width / 4;
    modal.y = app.screen.height / 4;

    // add.on
    let modalBg = new PIXI.Graphics();
    modalBg.beginFill(0xFFFFFF); // white bg
    modalBg.drawRoundedRect(0, 0, 700, 600, 16); // might be too big
    modalBg.endFill();
    modal.addChild(modalBg);

    // add the modal text
    let textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#000000',
        wordWrap: true,
        wordWrapWidth: 600,
    });

    let modalText = new PIXI.Text('Loading goals...', textStyle);
    modalText.x = 20;
    modalText.y = 20;
    modal.addChild(modalText);

    // Load Goals
    await loadGoals(modalText);

    async function loadGoals(modalText) {
        try {
            const response = await fetch('/api/goals');
            const goals = await response.json();
    
            let goalsText = goals.map(goal => 
                `${goal.goals} - Completed: ${goal.complete ? 'Yes' : 'No'}`
            ).join('\n');
    
            modalText.text = `Viewing All Goals! (click to close)\n${goalsText}`;
        } catch (error) {
            console.error('Error:', error);
            modalText.text = 'Internal Network Error: Failed to Load Goals';
        }
    }

    // click to close
    modal.interactive = true;
    modal.buttonMode = true;
    modal.on('pointerdown', () => {
        app.stage.removeChild(bg);
        app.stage.removeChild(modal);
    });

    app.stage.addChild(modal);

}

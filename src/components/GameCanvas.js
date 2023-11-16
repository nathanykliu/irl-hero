import React, { useRef, useEffect} from 'react';
import * as PIXI from 'pixi.js';

const GameCanvas = () => {
    const pixiContainer = useRef(null);

    useEffect(() => {

        // on mount, create a Pixi.js app and append the canvas to the div
        let app = new PIXI.Application({
            width: 1024,
            height: 1024,
            backgroundColor: 0xFFFFFF,
        });

        pixiContainer.current.appendChild(app.view);


        //background
        let background = PIXI.Sprite.from('stage1background.png');
        background.anchor.set(0, 0);
        background.x = 0;
        background.y = 0;
        background.width = 1024;
        background.height = 1024;
        app.stage.addChild(background);

        //sprites
        let downSprite = PIXI.Sprite.from('downsprite.png');
        let upSprite = PIXI.Sprite.from('upsprite.png');
        let leftSprite = PIXI.Sprite.from('leftsprite.png');
        let rightSprite = PIXI.Sprite.from('rightsprite.png');

        //initial sprite movement (start w/ downsprite)
        let currentSprite = downSprite;
        app.stage.addChild(currentSprite);

        downSprite.anchor.set(0.0);
        downSprite.x = app.screen.width / 2;
        downSprite.y = app.screen.height / 2;

        //whiteboard/notepad creation
        let whiteboard = PIXI.Sprite.from('whiteboard.png');
        whiteboard.x = app.screen.width / 3;
        whiteboard.y = app.screen.height / 3;
        app.stage.addChild(whiteboard);

        app.stage.addChild(downSprite); // (!!!load orders matters in pixi.js)

        function changeSprite(newSprite) {
            if (currentSprite !== newSprite) {

                //storing the current sprite position
                const currentX = currentSprite.x;
                const currentY = currentSprite.y;
        
                app.stage.removeChild(currentSprite);
                currentSprite = newSprite;
                currentSprite.anchor.set(0.0);
        
                // Set the new sprite's position to the stored position
                currentSprite.x = currentX;
                currentSprite.y = currentY;
        
                app.stage.addChild(currentSprite);
            }
        }

        const speed = 8;

        function spriteCollision(a, b) {
            return a.x - a.width / 2 < b.x + b.width / 2 &&
                   a.x + a.width / 2 > b.x - b.width / 2 &&
                   a.y - a.height / 2 < b.y + b.height / 2 &&
                   a.y + a.height / 2 > b.y - b.height / 2;
        }

        function moveLeft() {
            currentSprite.x -= speed;
            if (spriteCollision(currentSprite, whiteboard)) {
                currentSprite.x += speed; // stop sprite movement
            }
        }
        
        function moveRight() {
            currentSprite.x += speed;
            if (spriteCollision(currentSprite, whiteboard)) {
                currentSprite.x -= speed;
            }
        }
        
        function moveUp() {
            currentSprite.y -= speed;
            if (spriteCollision(currentSprite, whiteboard)) {
                currentSprite.y += speed;
            }
        }
        
        function moveDown() {
            currentSprite.y += speed;
            if (spriteCollision(currentSprite, whiteboard)) {
                currentSprite.y -= speed;
            }
        }

        function onKeyDown(e) {
            switch(e.code) {
                case 'ArrowLeft':
                    moveLeft();
                    changeSprite(leftSprite);
                    currentSprite = leftSprite;
                    break;
                case 'ArrowRight':
                    moveRight();
                    changeSprite(rightSprite);
                    currentSprite = rightSprite;
                    break;
                case 'ArrowUp':
                    moveUp();
                    changeSprite(upSprite);
                    currentSprite = upSprite;
                    break;
                case 'ArrowDown':
                    moveDown();
                    changeSprite(downSprite);
                    currentSprite = downSprite;
                    break;
                
                case 'Space':
                    if (isNearWhiteboard()) {
                        createModal();
                    }
                    break;

                default:
                    break;
                }   
            }

        window.addEventListener('keydown', onKeyDown);

        function isNearWhiteboard() {
            const proximity = 70; // (check console.log distance to view proximity to whiteboard)
            const dx = currentSprite.x - (whiteboard.x + whiteboard.width / 2);
            const dy = currentSprite.y - (whiteboard.y + whiteboard.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Notebook:" + distance);

            return distance < proximity;
        }

        async function createModal() {
            // create teh background
            let bg = new PIXI.Graphics();
            bg.beginFill(0x000000, 0.5);
            bg.drawRect(0, 0, app.screen.width, app.screen.height);
            bg.endFill();
            app.stage.addChild(bg);
        
            // create a modal container
            let modal = new PIXI.Container();
            modal.x = app.screen.width / 4;
            modal.y = app.screen.height / 4;
        
            // add the modal bg
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // white bg
            modalBg.drawRoundedRect(0, 0, 600, 600, 16) // might be too big
            modalBg.endFill();
            modal.addChild(modalBg);
        
            // add the modal text
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 500, 
            });
        
            let modalText = new PIXI.Text('Loading goals...', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);
        
            async function loadGoals() {
                try {
                    const response = await fetch('/api/goals');
                    const goals = await response.json();
            
                    let goalsText = goals.map(goal => 
                        `${goal.goals} - ${goal.days} days - Completed: ${goal.complete ? 'Yes' : 'No'}`
                    ).join('\n');
            
                    modalText.text = `Goals:\n${goalsText}`;
                } catch (error) {
                    console.error('Error:', error);
                    modalText.text = 'Failed to load goals.';
                }
            }
            
            loadGoals();
            
            // add a close button (make modal clickable)
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
            });
        
            app.stage.addChild(modal);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            app.destroy();
        };

    }, []);

    return (
        <div ref={pixiContainer} className="game-canvas-container">
        </div>
    );
};

export default GameCanvas;
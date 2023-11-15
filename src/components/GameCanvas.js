import React, { useRef, useEffect} from 'react';
import * as PIXI from 'pixi.js';

const GameCanvas = () => {
    const pixiContainer = useRef(null);

    useEffect(() => {

        // On component mount, create a Pixi.js app and append the canvas to the div
        let app = new PIXI.Application({
            width: 1024,
            height: 1024,
            backgroundColor: 0xFFFFFF,
        });

        pixiContainer.current.appendChild(app.view);

        //now we set teh background image of the canvas (stage 1)
        
     
    

        // Your Pixi.js game logic goes here
        // Example: Adding a simple sprite
        // let sprite = PIXI.Sprite.from("path_to_your_sprite_image.png");
        // app.stage.addChild(sprite);

        let background = PIXI.Sprite.from('stage1background.png');
        background.anchor.set(0, 0); // Anchor top-left
        background.x = 0; // Position at left edge
        background.y = 0; // Position at top edge
        background.width = 1024; // Width of the canvas
        background.height = 1024; // Height of the canvas
        app.stage.addChild(background);
        
        // Add the sprite to the stage
        app.stage.addChild(background);

        let sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png');
        sprite.anchor.set(0.5);
        sprite.x = app.screen.width / 2;
        sprite.y = app.screen.height / 2;

        let whiteboard = PIXI.Sprite.from('whiteboard.png');
        whiteboard.x = app.screen.width / 3; // Adjust as needed
        whiteboard.y = app.screen.height / 3;
        whiteboard.width = 52; // Set the width of the whiteboard
        whiteboard.height = 42; // Set the height of the whiteboard
        app.stage.addChild(whiteboard);

        app.stage.addChild(sprite);      // Add the sprite last

        const speed = 5;

        function spriteCollision(a, b) {
            return a.x + a.width > b.x &&
                   a.x < b.x + b.width &&
                   a.y + a.height > b.y &&
                   a.y < b.y + b.height;
        }

        function moveLeft() {
            sprite.x -= speed;
            if (spriteCollision(sprite, whiteboard)) {
                sprite.x += speed; // stop sprite movement
            }
        }
        
        function moveRight() {
            sprite.x += speed;
            if (spriteCollision(sprite, whiteboard)) {
                sprite.x -= speed;
            }
        }
        
        function moveUp() {
            sprite.y -= speed;
            if (spriteCollision(sprite, whiteboard)) {
                sprite.y += speed;
            }
        }
        
        function moveDown() {
            sprite.y += speed;
            if (spriteCollision(sprite, whiteboard)) {
                sprite.y -= speed;
            }
        }

        function onKeyDown(e) {
            switch(e.code) {
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowUp':
                    moveUp();
                    break;
                case 'ArrowDown':
                    moveDown();
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
            const proximity = 50; // Adjust this value as needed
            const dx = sprite.x - (whiteboard.x + whiteboard.width / 2);
            const dy = sprite.y - (whiteboard.y + whiteboard.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
        
            return distance < proximity;
        }

        function createModal() {
            // Create a semi-transparent background
            let bg = new PIXI.Graphics();
            bg.beginFill(0x000000, 0.5); // Black with 50% opacity
            bg.drawRect(0, 0, app.screen.width, app.screen.height);
            bg.endFill();
            app.stage.addChild(bg);
        
            // Create a container for the modal
            let modal = new PIXI.Container();
            modal.x = app.screen.width / 4;
            modal.y = app.screen.height / 4;
        
            // Add a background for the modal
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // White background
            modalBg.drawRoundedRect(0, 0, 400, 300, 16); // Adjust size as needed
            modalBg.endFill();
            modal.addChild(modalBg);
        
            // Add text to the modal
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
            });
            let modalText = new PIXI.Text('Goals\n\n[Add your content here]', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);
        
            // Add a close button (or just make the whole modal clickable)
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

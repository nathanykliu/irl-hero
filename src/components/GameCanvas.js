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

        let downSprite = PIXI.Sprite.from('downsprite.png');
        let upSprite = PIXI.Sprite.from('upsprite.png');
        let leftSprite = PIXI.Sprite.from('leftsprite.png');
        let rightSprite = PIXI.Sprite.from('rightsprite.png');

        //initial sprite movement (default to down)
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
                // Store the current position
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
        


        const speed = 5;

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
            const proximity = 70; // Adjust this value as needed
            const dx = currentSprite.x - (whiteboard.x + whiteboard.width / 2);
            const dy = currentSprite.y - (whiteboard.y + whiteboard.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Notebook:" + distance);
        
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
                wordWrap: true,
                wordWrapWidth: 350, // Adjust as needed
            });

            let modalText = new PIXI.Text('Goals\n\n[Add your content here. Click on this window to close it.]', textStyle);
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
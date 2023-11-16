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

        //animation test
        let img = new Image();
        img.src = "newspritesheet.png";

        img.onload = () => {
            createRightAnimation(img);
        };

        let animatedSpriteRight;

        function createRightAnimation(image) {
            let baseTexture = new PIXI.BaseTexture(image);
            let frames = [];

            const frameWidth = 78; // width of each frame
            const frameHeight = 65; // height of each frame
            const numberOfFrames = 5; // total number of frames in the sprite sheet

            for (let i = 0; i < numberOfFrames; i++) {
                let frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight));
                frames.push(frame);
            }

            animatedSpriteRight = new PIXI.AnimatedSprite(frames);
            animatedSpriteRight.animationSpeed = 0.1;
            animatedSpriteRight.play();

            animatedSpriteRight.visible = false; 
            app.stage.addChild(animatedSpriteRight);

        }

        //animation left
        let img2 = new Image();
        img2.src = "newspritesheet.png";

        img2.onload = () => {
            createLeftAnimation(img2);
        };

        let animatedSpriteLeft;

        function createLeftAnimation(image) {
            let baseTexture = new PIXI.BaseTexture(image);
            let frames = [];

            const frameWidth = 78; // Width of each frame
            const frameHeight = 65; // Height of each frame
            const numberOfFrames = 5; // Total number of frames in the sprite sheet

            for (let i = 0; i < numberOfFrames; i++) {
                let frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(i * frameWidth, 65, frameWidth, frameHeight));
                frames.push(frame);
            }

            animatedSpriteLeft = new PIXI.AnimatedSprite(frames);
            animatedSpriteLeft.animationSpeed = 0.1;
            animatedSpriteLeft.play();

            animatedSpriteLeft.visible = false; 
            app.stage.addChild(animatedSpriteLeft);

        }

        //static sprites (no idle animation)
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

        //notepad creation
        let notepad = PIXI.Sprite.from('notepad.png');
        notepad.x = app.screen.width / 3;
        notepad.y = app.screen.height / 3;
        app.stage.addChild(notepad);

        //change user computer sprite
        let changeUser = PIXI.Sprite.from('users.png');
        changeUser.x = app.screen.width / 1.9;
        changeUser.y = app.screen.height / 1.5;
        app.stage.addChild(changeUser);

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
                currentSprite.visible = true;
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
            if (spriteCollision(currentSprite, notepad) || spriteCollision(currentSprite, changeUser)) {
                currentSprite.x += speed; // stop sprite movement
            }
        }

        function moveRight() {
            currentSprite.x += speed;
            if (spriteCollision(currentSprite, notepad) || spriteCollision(currentSprite, changeUser)) {
                currentSprite.x -= speed;
            }
        }
        
        function moveUp() {
            currentSprite.y -= speed;
            if (spriteCollision(currentSprite, notepad) || spriteCollision(currentSprite, changeUser)) {
                currentSprite.y += speed;
            }
        }
        
        function moveDown() {
            currentSprite.y += speed;
            if (spriteCollision(currentSprite, notepad) || spriteCollision(currentSprite, changeUser)) {
                currentSprite.y -= speed;
            }
        }
        

        function onKeyDown(e) {
            switch(e.code) {
                case 'ArrowLeft':
                    moveLeft();
                    if (animatedSpriteLeft) {
                        changeSprite(animatedSpriteLeft);
                    } else {
                        changeSprite(leftSprite);
                    }
                    break;

                case 'ArrowRight':
                    moveRight();
                    if (animatedSpriteRight) {
                        changeSprite(animatedSpriteRight);
                    } else {
                        changeSprite(rightSprite);
                    }
                    currentSprite=animatedSpriteRight;
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
                    if (isNearNotepad()) {
                        createGoalsModal();
                    } else if (isNearUsers()) {
                        createUsersModal();
                    }
                    break;

                default:
                    break;
                }   
            }

            function onKeyUp(e) {
                switch(e.code) {
                    case 'ArrowRight':
                        changeSprite(rightSprite);
                        break;
                    case 'ArrowLeft':
                        changeSprite(leftSprite);
                        break;
                    case 'ArrowUp':
                        changeSprite(upSprite);
                        break;
                    case 'ArrowDown':
                        changeSprite(downSprite);
                        break;
                    default:
                        break;
                } 
            }

        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);

        function isNearNotepad() {
            const proximity = 70; // (check console.log distance to view proximity to whiteboard)
            const dx = currentSprite.x - (notepad.x + notepad.width / 2);
            const dy = currentSprite.y - (notepad.y + notepad.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Notebook:" + distance);

            return distance < proximity;
        }

        function isNearUsers() {
            const proximity = 70; // (check console.log distance to view proximity to whiteboard)
            const dx = currentSprite.x - (changeUser.x + changeUser.width / 2);
            const dy = currentSprite.y - (changeUser.y + changeUser.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Users:" + distance);

            return distance < proximity;
        }

        async function createGoalsModal() {
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
        
            // add the modal bg
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // white bg
            modalBg.drawRoundedRect(0, 0, 600, 600, 16); // might be too big
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
        
            // Add a close button (*made it clickable)
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
            });
        
            app.stage.addChild(modal);
        }

        async function createUsersModal() {
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
        
            // add the modal bg
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // white bg
            modalBg.drawRoundedRect(0, 0, 600, 600, 16); // might be too big
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
        
            let modalText = new PIXI.Text('Loading users...', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);
        
            // Load Users
            await loadUsers(modalText);
        
            // Add a close button (*made it clickable)
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
            });
        
            app.stage.addChild(modal);
        }
        
        async function loadUsers(modalText) {
            try {
                const response = await fetch('/api/users');
                const users = await response.json();
                console.log(users)
        
                let usersText = users.map(user => 
                    `ID: ${user.id}, Name: ${user.firstname} ${user.lastname}, Stage: ${user.stage}`
                ).join('\n');
                
        
                modalText.text = `Viewing All Users! (click to close)\n${usersText}`;
            } catch (error) {
                console.error('Error:', error);
                modalText.text = 'Internal Network Error: Failed to Load Users';
            }
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            app.destroy();
        };

    }, []);

    return (
        <div ref={pixiContainer} className="game-canvas-container">
        </div>
    );
};

export default GameCanvas;
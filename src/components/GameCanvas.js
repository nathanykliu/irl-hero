import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { createGoalsModal } from './modals.js';

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
            const numberOfFrames = 5; // # of frames to play

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

            const frameWidth = 78; 
            const frameHeight = 65;
            const numberOfFrames = 5;

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

        //animation up
        let img3 = new Image();
        img3.src = "newspritesheet.png";

        img3.onload = () => {
            createUpAnimation(img3);
        };

        let animatedSpriteUp;

        function createUpAnimation(image) {
            let baseTexture = new PIXI.BaseTexture(image);
            let frames = [];

            const frameWidth = 78;
            const frameHeight = 70;
            const numberOfFrames = 3;

            for (let i = 0; i < numberOfFrames; i++) {
                let frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(i * frameWidth, 214, frameWidth, frameHeight));
                frames.push(frame);
            }

            animatedSpriteUp = new PIXI.AnimatedSprite(frames);
            animatedSpriteUp.animationSpeed = 0.1;
            animatedSpriteUp.play();

            animatedSpriteUp.visible = false; 
            app.stage.addChild(animatedSpriteUp);

        }
        
        //animation down
        let img4 = new Image();
        img4.src = "newspritesheet.png";

        img4.onload = () => {
            createDownAnimation(img4);
        };

        let animatedSpriteDown;

        function createDownAnimation(image) {
            let baseTexture = new PIXI.BaseTexture(image);
            let frames = [];

            const frameWidth = 78;
            const frameHeight = 85;
            const numberOfFrames = 3;

            for (let i = 0; i < numberOfFrames; i++) {
                let frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(i * frameWidth, 130, frameWidth, frameHeight));
                frames.push(frame);
            }

            animatedSpriteDown = new PIXI.AnimatedSprite(frames);
            animatedSpriteDown.animationSpeed = 0.1;
            animatedSpriteDown.play();

            animatedSpriteDown.visible = false; 
            app.stage.addChild(animatedSpriteDown);

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
        notepad.x = app.screen.width / 2.25;
        notepad.y = app.screen.height / 3.5;
        app.stage.addChild(notepad);

        //computer changeUser sprite
        let changeUser = PIXI.Sprite.from('users.png');
        changeUser.x = app.screen.width / 1.9;
        changeUser.y = app.screen.height / 1.5;
        app.stage.addChild(changeUser);

        //keyboard in front of computer
        let keyboard = PIXI.Sprite.from('keyboard.png');
        keyboard.x = app.screen.width / 1.865;
        keyboard.y = app.screen.height / 1.39;
        app.stage.addChild(keyboard);

        //cell phone getUser sprite
        let cellphone = PIXI.Sprite.from('cellphone.png');
        cellphone.x = app.screen.width / 2.5;
        cellphone.y = app.screen.height / 1.5;
        app.stage.addChild(cellphone);

        app.stage.addChild(downSprite); // (!!!load orders matters in pixi.js)

        function changeSprite(newSprite) {
            if (currentSprite !== newSprite) {

                //storing the current sprite position
                const currentX = currentSprite.x;
                const currentY = currentSprite.y;
                app.stage.removeChild(currentSprite);
                currentSprite = newSprite;
                currentSprite.anchor.set(0.0);
        
                // setting new sprite position to stored position
                currentSprite.visible = true;
                currentSprite.x = currentX;
                currentSprite.y = currentY;
        
                app.stage.addChild(currentSprite);
            }
        }

        const speed = 5;

        //collision logic
        function spriteCollision(a, b, collisionMargin) {
            // Reduce the effective size of each sprite's collision area by the margin
            let aEffectiveWidth = a.width - collisionMargin;
            let aEffectiveHeight = a.height - collisionMargin;
            let bEffectiveWidth = b.width - collisionMargin;
            let bEffectiveHeight = b.height - collisionMargin;
        
            return a.x - aEffectiveWidth / 2 < b.x + bEffectiveWidth / 2 &&
                   a.x + aEffectiveWidth / 2 > b.x - bEffectiveWidth / 2 &&
                   a.y - aEffectiveHeight / 2 < b.y + bEffectiveHeight / 2 &&
                   a.y + aEffectiveHeight / 2 > b.y - bEffectiveHeight / 2;
        }

        function moveLeft() {
            currentSprite.x -= speed;
            if (spriteCollision(currentSprite, notepad, 5) || spriteCollision(currentSprite, changeUser, 5)) {
                currentSprite.x += speed; // stop sprite movement
            }
        }

        function moveRight() {
            currentSprite.x += speed;
            if (spriteCollision(currentSprite, notepad, 5) || spriteCollision(currentSprite, changeUser, 5)) {
                currentSprite.x -= speed;
            }
        }
        
        function moveUp() {
            currentSprite.y -= speed;
            if (spriteCollision(currentSprite, notepad, 5) || spriteCollision(currentSprite, changeUser, 5)) {
                currentSprite.y += speed;
            }
        }

        function moveDown() {
            currentSprite.y += speed;
            if (spriteCollision(currentSprite, notepad, 5) || spriteCollision(currentSprite, changeUser, 5)) {
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
                    if (animatedSpriteUp) {
                        changeSprite(animatedSpriteUp);
                    } else {
                        changeSprite(upSprite);
                    }
                    break;

                case 'ArrowDown':
                    moveDown();
                    if (animatedSpriteDown) {
                        changeSprite(animatedSpriteDown);
                    } else {
                        changeSprite(downSprite);
                    }
                    break;

                case 'Space':
                    if (isNearNotepad()) {
                        createGoalsModal();
                    } else if (isNearComputer()) {
                        createUsersModal();
                    } else if (isNearCellphone()) {
                        createGetUserModal();
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

        function isNearComputer() {
            const proximity = 70; // (check console.log distance to view proximity to computer)
            const dx = currentSprite.x - (changeUser.x + changeUser.width / 2);
            const dy = currentSprite.y - (changeUser.y + changeUser.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Users:" + distance);

            return distance < proximity;
        }

        function isNearCellphone() {
            const proximity = 70; // (check console.log distance to view proximity to cellphone)
            const dx = currentSprite.x - (cellphone.x + cellphone.width / 2);
            const dy = currentSprite.y - (cellphone.y + cellphone.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Cellphone:" + distance);

            return distance < proximity;
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
        
            let modalText = new PIXI.Text('Loading users...', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);
        
            // async load
            await loadUsers(modalText);
        
            // click to close
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
            });
        
            app.stage.addChild(modal);
        }

        async function createGetUserModal(userId) {

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
            modalBg.drawRoundedRect(0, 0, 700, 600, 16); // might be too big
            modalBg.endFill();
            modal.addChild(modalBg);

            //create input field for userid
            let inputField = new PIXI.Graphics();
            inputField.beginFill(0xFFFFFF); // white background for input field
            inputField.drawRoundedRect(0, 0, 200, 30, 5); // adjust size as needed
            inputField.endFill();
            inputField.x = 20;
            inputField.y = 100;
            modal.addChild(inputField);

            // Text for input field
            let inputText = new PIXI.Text('', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: '#000000'
            });
            inputText.x = 25;
            inputText.y = 105;
            modal.addChild(inputText);

            // Interactivity for input field
            inputField.interactive = true;
            inputField.buttonMode = true;
            inputField.on('pointerdown', () => {
                // Implement functionality to focus and enter text
                // Note: PIXI.js does not support text input directly, so you may need a workaround
            });
            
            //create a get button
            let button = new PIXI.Graphics();
            button.beginFill(0x00FF00); // green button
            button.drawRoundedRect(0, 0, 80, 30, 5); // adjust size as needed
            button.endFill();
            button.x = 230;
            button.y = 100;
            modal.addChild(button);

            // Button text
            let buttonText = new PIXI.Text('Get', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: '#FFFFFF' // white text
            });
            buttonText.x = button.x + 20;
            buttonText.y = button.y + 5;
            modal.addChild(buttonText);

            // Button interactivity
            button.interactive = true;
            button.buttonMode = true;
            button.on('pointerdown', async () => {
                // Here you pass the input from the input field to the loadGetUser function
                let userId = inputText.text; // Assuming the text in inputText is the user ID
                await loadGetUser(modalText, userId);
            });
        
            //add the modal text
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 600,
            });
        
            let modalText = new PIXI.Text('Enter User ID and click Get', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);
        
            //load target user
            await loadGetUser(modalText, userId);

            async function loadGetUser(modalText, userId) {
                try {
                    const response = await fetch(`/api/users/${userId}`);
                    const user = await response.json();
        
                    modalText.text = `User Details:\n\nName: ${user.firstname} ${user.lastname}\nStage: ${user.stage}`;
                } catch (error) {
                    console.error('Error:', error);
                    modalText.text = 'Internal Network Error: Failed to Load User Details';
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
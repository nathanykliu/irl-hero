import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';

const GameCanvas = () => {
    const pixiContainer = useRef(null);

    useEffect(() => {

        const stage1audio = new Audio('stage1.mp3');
        const stage1Secret = new Audio('stage1secret.mp3');
        let isMusicPlaying = false;
        let isModalOpen = false;

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

        // right animation
        let img = new Image();
        //load spritesheet
        img.src = "newspritesheet.png";

        img.onload = () => {
            createRightAnimation(img);
        };

        //create an instance first
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

            //create the animated sprite, set speed
            animatedSpriteRight = new PIXI.AnimatedSprite(frames);
            animatedSpriteRight.animationSpeed = 0.1;
            animatedSpriteRight.play();

            //hide until used
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

        //notepad (getgoals)
        let notepad = PIXI.Sprite.from('notepad.png');
        notepad.x = app.screen.width / 2.7;
        notepad.y = app.screen.height / 3.5;
        app.stage.addChild(notepad);

        //computer (getusers)
        let computer = PIXI.Sprite.from('users.png');
        computer.x = app.screen.width / 1.9;
        computer.y = app.screen.height / 1.5;
        app.stage.addChild(computer);

        //keyboard in front of computer
        let keyboard = PIXI.Sprite.from('keyboard.png');
        keyboard.x = app.screen.width / 1.865;
        keyboard.y = app.screen.height / 1.39;
        app.stage.addChild(keyboard);

        //cell phone (getusers/id)
        let cellphone = PIXI.Sprite.from('cellphone.png');
        cellphone.x = app.screen.width / 2.5;
        cellphone.y = app.screen.height / 1.5;
        app.stage.addChild(cellphone);

        //music player
        let music = PIXI.Sprite.from('music.png');
        music.x = app.screen.width / 1.6;
        music.y = app.screen.height / 4;
        app.stage.addChild(music);

        //secret player
        let secret = PIXI.Sprite.from('secret.png');
        secret.x = app.screen.width / 1.8;
        secret.y = app.screen.height / 3;
        app.stage.addChild(secret);

        //pencil
        let pencil = PIXI.Sprite.from('pencil.png');
        pencil.x = app.screen.width / 2.15;
        pencil.y = app.screen.height / 3.42;
        app.stage.addChild(pencil);

        let mouse = PIXI.Sprite.from('mouse.png');
        mouse.x = app.screen.width / 3.4;
        mouse.y = app.screen.height / 2.4;
        app.stage.addChild(mouse);

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

        //SET SPEED HERE
        const speed = 5;

        //collision logic
        function spriteCollision(a, b, collisionMargin) {
            // reduce the effective size of each sprite's collision area by the margin
            let aEffectiveWidth = a.width - collisionMargin;
            let aEffectiveHeight = a.height - collisionMargin;
            let bEffectiveWidth = b.width - collisionMargin;
            let bEffectiveHeight = b.height - collisionMargin;
        
            return a.x - aEffectiveWidth / 2 < b.x + bEffectiveWidth / 2 &&
                   a.x + aEffectiveWidth / 2 > b.x - bEffectiveWidth / 2 &&
                   a.y - aEffectiveHeight / 2 < b.y + bEffectiveHeight / 2 &&
                   a.y + aEffectiveHeight / 2 > b.y - bEffectiveHeight / 2;
        }

        //movement and collision
        function moveLeft() {
            currentSprite.x -= speed;
            if (spriteCollision(currentSprite, notepad, 30) || spriteCollision(currentSprite, computer, 30) || spriteCollision(currentSprite, music, 30) 
            || spriteCollision(currentSprite, secret, 30) || spriteCollision(currentSprite, pencil, 30) || spriteCollision(currentSprite, mouse, 30)) {
                currentSprite.x += speed; // stop sprite movement
            }
        }

        function moveRight() {
            currentSprite.x += speed;
            if (spriteCollision(currentSprite, notepad, 30) || spriteCollision(currentSprite, computer, 30) || spriteCollision(currentSprite, music, 30)
            || spriteCollision(currentSprite, secret, 30) || spriteCollision(currentSprite, pencil, 30) || spriteCollision(currentSprite, mouse, 30)) {
                currentSprite.x -= speed;
            }
        }

        function moveUp() {
            currentSprite.y -= speed;
            if (spriteCollision(currentSprite, notepad, 30) || spriteCollision(currentSprite, computer, 30) || spriteCollision(currentSprite, music, 30)
            || spriteCollision(currentSprite, secret, 30) || spriteCollision(currentSprite, pencil, 30) || spriteCollision(currentSprite, mouse, 30)) {
                currentSprite.y += speed;
            }
        }

        function moveDown() {
            currentSprite.y += speed;
            if (spriteCollision(currentSprite, notepad, 30) || spriteCollision(currentSprite, computer, 30) || spriteCollision(currentSprite, music, 30)
            || spriteCollision(currentSprite, secret, 30) || spriteCollision(currentSprite, pencil, 30) || spriteCollision(currentSprite, mouse, 30)) {
                currentSprite.y -= speed;
            }
        }

        //keyboard controls
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
                    } else if (isNearPencil()) {
                        createAddGoalModal();
                    } else if (isNearMouse()) {
                        createAddUserModal();
                    } else if (isNearSecret()) {
                        if (isMusicPlaying) {
                            stage1Secret.pause();
                            console.log('Secret paused!')
                        } else {
                            stage1Secret.play();
                            console.log('Secret playing!')
                        }
                            isMusicPlaying = !isMusicPlaying;
                    } else if (isNearMusic()) {
                        if (isMusicPlaying) {
                            stage1audio.pause();
                            console.log('Music paused!')
                        } else {
                            stage1audio.play();
                            console.log('Music playing!')
                        }
                            isMusicPlaying = !isMusicPlaying;
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
            const proximity = 45; // (check console.log distance to view proximity to notepad)
            const dx = currentSprite.x - (notepad.x + notepad.width / 2);
            const dy = currentSprite.y - (notepad.y + notepad.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Notepad:" + distance);

            return distance < proximity;
        }

        function isNearSecret() {
            const proximity = 50; // (check console.log distance to view proximity to secret)
            const dx = currentSprite.x - (secret.x + secret.width / 2);
            const dy = currentSprite.y - (secret.y + secret.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Secret:" + distance);

            return distance < proximity;
        }

        function isNearComputer() {
            const proximity = 50; // (check console.log distance to view proximity to computer)
            const dx = currentSprite.x - (computer.x + computer.width / 2);
            const dy = currentSprite.y - (computer.y + computer.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Computer:" + distance);

            return distance < proximity;
        }

        function isNearCellphone() {
            const proximity = 60; // (check console.log distance to view proximity to cellphone)
            const dx = currentSprite.x - (cellphone.x + cellphone.width / 2);
            const dy = currentSprite.y - (cellphone.y + cellphone.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Cellphone:" + distance);

            return distance < proximity;
        }

        function isNearMusic() {
            const proximity = 50; // (check console.log distance to view proximity to music)
            const dx = currentSprite.x - (music.x + music.width / 2);
            const dy = currentSprite.y - (music.y + music.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Music:" + distance);

            return distance < proximity;
        }

        function isNearPencil() {
            const proximity = 50; // (check console.log distance to view proximity to pencil)
            const dx = currentSprite.x - (pencil.x + pencil.width / 2);
            const dy = currentSprite.y - (pencil.y + pencil.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Pencil:" + distance);

            return distance < proximity;
        }

        function isNearMouse() {
            const proximity = 50; // (check console.log distance to view proximity to mouse)
            const dx = currentSprite.x - (mouse.x + mouse.width / 2);
            const dy = currentSprite.y - (mouse.y + mouse.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            console.log("Distance from Mouse:" + distance);

            return distance < proximity;
        }

        // notepad modal
        async function createGoalsModal() {

            //prevents multiple modals from opening
            if (isModalOpen) return;
            isModalOpen = true;

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
            modalBg.drawRoundedRect(0, 0, 650, 500, 16); // might be too big
            modalBg.endFill();
            modal.addChild(modalBg);
        
            // add the modal text
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 650,
            });
        
            let modalText = new PIXI.Text('Loading goals...', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);
        
            // load Goals
            await loadGoals(modalText);
        
            async function loadGoals(modalText) {
                try {
                    const response = await fetch('/api/goals');
                    const goals = await response.json();
                    console.log(goals)
            
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
                isModalOpen = false;
            });
        
            app.stage.addChild(modal);
        
        }
        
        // computer modal
        async function createUsersModal() {

            //prevents multiple modals from opening
            if (isModalOpen) return;
            isModalOpen = true;

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
                isModalOpen = false;
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
        
        // cell phone modal
        async function createGetUserModal(userid) {

            //prevents multiple modals from opening
            if (isModalOpen) return;
            isModalOpen = true;


            console.log('Waiting for user input...');

            // (get user by id) create the background
            let bg = new PIXI.Graphics();
            bg.beginFill(0x000000, 0.5);
            bg.drawRect(0, 0, app.screen.width, app.screen.height);
            bg.endFill();
            app.stage.addChild(bg);

            // (get user by id) create a modal container
            let modal = new PIXI.Container();
            modal.x = app.screen.width / 4;
            modal.y = app.screen.height / 4;

            // (get user by id) add the modal bg
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // white bg
            modalBg.drawRoundedRect(0, 0, 400, 600, 16); // might be too big
            modalBg.endFill();
            modal.addChild(modalBg);

            // get button
            let button = new PIXI.Graphics();
            button.beginFill(0x4CAF50);
            button.drawRoundedRect(0, 0, 200, 40, 5);
            button.endFill();
            button.x = 100;
            button.y = 200;
            button.cursor = 'pointer';
            modal.addChild(button);

            // adjusts the height of the input box
            let canvasBounds = app.view.getBoundingClientRect();
            let inputX = canvasBounds.left + modal.x + button.x;
            let inputY = canvasBounds.top + modal.y + button.y - 25;

            let htmlInput = document.createElement('input');
            htmlInput.type = 'text';
            htmlInput.style.position = 'absolute';
            htmlInput.style.top = `${inputY}px`;
            htmlInput.style.left = `${inputX}px`;
            htmlInput.style.width = '200px';
            document.body.appendChild(htmlInput);

            // focus the input
            htmlInput.focus();

            // cleaning up enter key
            htmlInput.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    let userid = htmlInput.value.trim();
                    if (userid) {
                        modalText.text = "Searching...";
                        await loadGetUser(modalText, userid);
                    }
                }
            });

            // button text
            let buttonText = new PIXI.Text('Press Enter to search!', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: '#FFFFFF',
                align: 'center' 
            });
            
            // calculate the position to center the text on the button
            buttonText.anchor.set(0.5, 0.5);
            buttonText.x = button.x + (button.width / 2);
            buttonText.y = button.y + (button.height / 2);
            
            modal.addChild(buttonText);

            //add the modal text
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 600,
            });
        
            let modalText = new PIXI.Text('Enter User ID and press Enter', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);

            //load target user
            await loadGetUser(modalText, userid);

            async function loadGetUser(modalText, userid) {
                modalText.text = "Loading user information...";

                // default text while userid doesn't exist
                if (!userid) {
                    modalText.text = "Dogfather's iPhone";
                    return;
                }

                try {
                    let url = `/api/users/${userid}`;
                    const response = await fetch(url);
            
                    console.log('Requesting:', url);
                    console.log('Response Status:', response.status);
            
                    if (!response.ok) {
                        throw new Error(`HTTP Error: ${response.status}`);
                    }
            
                    const data = await response.json();
                    console.log('Response Data:', data);
            
                    // '/api/users/:id'
                    modalText.text = `User Details:\n\nName: ${data.firstname} ${data.lastname}\nStage: ${data.stage}`;
                
                } catch (error) {
                    console.error('Error:', error);
                    modalText.text = 'Error: ' + error.message;
                }
            }

            // click to close
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
                document.body.removeChild(htmlInput)
                isModalOpen = false;
            });

            htmlInput.setAttribute('aria-label', 'Enter User ID');
        
            app.stage.addChild(modal);

        }

        async function createAddGoalModal() {

            //prevents multiple modals from opening
            if (isModalOpen) return;
            isModalOpen = true;

            console.log('Waiting for user input...');

            // (add goal) create the background
            let bg = new PIXI.Graphics();
            bg.beginFill(0x000000, 0.5);
            bg.drawRect(0, 0, app.screen.width, app.screen.height);
            bg.endFill();
            app.stage.addChild(bg);

            // (add goal) create a modal container
            let modal = new PIXI.Container();
            modal.x = app.screen.width / 4;
            modal.y = app.screen.height / 4;

            // (add goal) add the modal bg
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // white bg
            modalBg.drawRoundedRect(0, 0, 400, 700, 16); // might be too big
            modalBg.endFill();
            modal.addChild(modalBg);

            // (add goal) button
            let button = new PIXI.Graphics();
            button.beginFill(0x4CAF50);
            button.drawRoundedRect(0, 0, 200, 40, 5);
            button.endFill();
            button.x = 100;
            button.y = 200;
            button.cursor = 'pointer';
            modal.addChild(button);

            // adjusts the height of the input box
            let canvasBounds = app.view.getBoundingClientRect();
            let inputX = canvasBounds.left + modal.x + button.x;
            let inputY = canvasBounds.top + modal.y + button.y - 60;

            // cleaning up enter key
            window.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    const goal = goalInput.value.trim();
                    const days = parseInt(daysInput.value.trim());
                    const userId = parseInt(userIdInput.value.trim());
        
                    if (goal && !isNaN(days) && !isNaN(userId)) {
                        modalText.text = "Adding goal...";
                        await addGoal({ goals: goal, days, complete: false, userId });
                    }
                }
            });

            // button text
            let buttonText = new PIXI.Text('Press Enter to add goal!', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: '#FFFFFF',
                align: 'center' 
            });
            
            // calculate the position to center the text on the button
            buttonText.anchor.set(0.5, 0.5);
            buttonText.x = button.x + (button.width / 2);
            buttonText.y = button.y + (button.height / 2);

            modal.addChild(buttonText);

            //input fields for adding a goal
            let goalInput = document.createElement('input');
            goalInput.type = 'text';
            goalInput.placeholder = 'Goal';
            goalInput.style.position = 'absolute';
            goalInput.style.top = `${inputY - 60}px`;
            goalInput.style.left = `${inputX}px`;
            goalInput.style.width = '200px';
            document.body.appendChild(goalInput);

            let daysInput = document.createElement('input');
            daysInput.type = 'number';
            daysInput.placeholder = 'Days to Complete';
            daysInput.style.position = 'absolute';
            daysInput.style.top = `${inputY - 30}px`;
            daysInput.style.left = `${inputX}px`;
            daysInput.style.width = '200px';
            document.body.appendChild(daysInput);

            let userIdInput = document.createElement('input');
            userIdInput.type = 'number';
            userIdInput.placeholder = 'User ID';
            userIdInput.style.position = 'absolute';
            userIdInput.style.top = `${inputY + 0}px`;
            userIdInput.style.left = `${inputX}px`;
            userIdInput.style.width = '200px';
            document.body.appendChild(userIdInput);

            //add the modal text
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 600,
            });
        
            let modalText = new PIXI.Text('Add a goal and press Enter!', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);

            async function addGoal(goalData) {
                try {
                    let url = '/api/goals';
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(goalData)
                    });
        
                    if (!response.ok) {
                        throw new Error(`HTTP Error: ${response.status}`);
                    }
        
                    const data = await response.json();
                    modalText.text = `Goal Added: ${data.goals}`;
                } catch (error) {
                    console.error('Error:', error);
                    modalText.text = 'Error: ' + error.message;
                }
            }



            goalInput.focus();

            // click to close
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
                document.body.removeChild(goalInput);
                document.body.removeChild(daysInput);
                document.body.removeChild(userIdInput);
                isModalOpen = false;
            });

            app.stage.addChild(modal);

            function updateInputPositions() {
                let canvasBounds = app.view.getBoundingClientRect();
                let inputX = canvasBounds.left + modal.x + button.x;
                let inputY = canvasBounds.top + modal.y + button.y - 60;
            
                goalInput.style.top = `${inputY - 60}px`;
                goalInput.style.left = `${inputX}px`;
                daysInput.style.top = `${inputY - 30}px`;
                daysInput.style.left = `${inputX}px`;
                userIdInput.style.top = `${inputY + 0}px`;
                userIdInput.style.left = `${inputX}px`;
            }
    
            updateInputPositions();
            window.addEventListener('resize', updateInputPositions);

        }

        async function createAddUserModal() {
            //prevents multiple modals from opening
            if (isModalOpen) return;
            isModalOpen = true;

            console.log('Waiting for user input...');

            // (add user) create the background
            let bg = new PIXI.Graphics();
            bg.beginFill(0x000000, 0.5);
            bg.drawRect(0, 0, app.screen.width, app.screen.height);
            bg.endFill();
            app.stage.addChild(bg);

            // (add user) create a modal container
            let modal = new PIXI.Container();
            modal.x = app.screen.width / 4;
            modal.y = app.screen.height / 4;

            // (add user) add the modal bg
            let modalBg = new PIXI.Graphics();
            modalBg.beginFill(0xFFFFFF); // white bg
            modalBg.drawRoundedRect(0, 0, 400, 700, 16); // might be too big
            modalBg.endFill();
            modal.addChild(modalBg);

            // (add user) button
            let button = new PIXI.Graphics();
            button.beginFill(0x4CAF50);
            button.drawRoundedRect(0, 0, 200, 40, 5);
            button.endFill();
            button.x = 100;
            button.y = 200;
            button.cursor = 'pointer';
            modal.addChild(button);

            // adjusts the height of the input box
            let canvasBounds = app.view.getBoundingClientRect();
            let inputX = canvasBounds.left + modal.x + button.x;
            let inputY = canvasBounds.top + modal.y + button.y - 60;

            // cleaning up enter key and event listeners
            window.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    const firstname = firstNameInput.value.trim();
                    const lastname = lastNameInput.value.trim();
                    const stage = parseInt(stageInput.value.trim());
        
                    //input validation
                    modalText.text = "Adding user...";
                    await addUser({ firstname, lastname, stage });
                    
                }
            });

            // button text
            let buttonText = new PIXI.Text('Press Enter to add user!', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: '#FFFFFF',
                align: 'center' 
            });
            
            // calculate the position to center the text on the button
            buttonText.anchor.set(0.5, 0.5);
            buttonText.x = button.x + (button.width / 2);
            buttonText.y = button.y + (button.height / 2);

            modal.addChild(buttonText);

            //input fields for adding a user
            let firstNameInput = document.createElement('input');
            firstNameInput.type = 'text';
            firstNameInput.placeholder = 'First Name';
            firstNameInput.style.position = 'absolute';
            firstNameInput.style.top = `${inputY - 60}px`;
            firstNameInput.style.left = `${inputX}px`;
            firstNameInput.style.width = '200px';
            document.body.appendChild(firstNameInput);

            let lastNameInput = document.createElement('input');
            lastNameInput.type = 'text';
            lastNameInput.placeholder = 'Last Name';
            lastNameInput.style.position = 'absolute';
            lastNameInput.style.top = `${inputY - 30}px`;
            lastNameInput.style.left = `${inputX}px`;
            lastNameInput.style.width = '200px';
            document.body.appendChild(lastNameInput);

            let stageInput = document.createElement('input');
            stageInput.type = 'number';
            stageInput.placeholder = 'Stage';
            stageInput.style.position = 'absolute';
            stageInput.style.top = `${inputY + 0}px`;
            stageInput.style.left = `${inputX}px`;
            stageInput.style.width = '200px';
            document.body.appendChild(stageInput);

            //add the modal text
            let textStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 600,
            });
        
            let modalText = new PIXI.Text('Add a user and press Enter!', textStyle);
            modalText.x = 20;
            modalText.y = 20;
            modal.addChild(modalText);

            async function addUser(userData) {
                try {
                    let url = '/api/users';
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
        
                    if (!response.ok) {
                        throw new Error(`HTTP Error: ${response.status}`);
                    }
        
                    const data = await response.json();
                    modalText.text = `User Added: ${data.users}`;
                } catch (error) {
                    console.error('Error:', error);
                    modalText.text = 'Error: ' + error.message;
                }
            }

            firstNameInput.focus();

            // click to close
            modal.interactive = true;
            modal.buttonMode = true;
            modal.on('pointerdown', () => {
                app.stage.removeChild(bg);
                app.stage.removeChild(modal);
                document.body.removeChild(firstNameInput);
                document.body.removeChild(lastNameInput);
                document.body.removeChild(stageInput);
                isModalOpen = false;
            });

            app.stage.addChild(modal);

            function updateInputPositions() {
                let canvasBounds = app.view.getBoundingClientRect();
                let inputX = canvasBounds.left + modal.x + button.x;
                let inputY = canvasBounds.top + modal.y + button.y - 60;
            
                firstNameInput.style.top = `${inputY - 60}px`;
                firstNameInput.style.left = `${inputX}px`;
                lastNameInput.style.top = `${inputY - 30}px`;
                lastNameInput.style.left = `${inputX}px`;
                stageInput.style.top = `${inputY + 0}px`;
                stageInput.style.left = `${inputX}px`;
            }
    
            updateInputPositions();
            window.addEventListener('resize', updateInputPositions);

        }

        window.addEventListener('keydown', async (event) => {
            if (event.key === ' ' && event.target.tagName !== 'INPUT' && !isModalOpen) {
                event.preventDefault();
        
                if (isNearMouse()) {
                    await createAddUserModal();
                } else if (isNearPencil()) {
                    await createAddGoalModal();
                } else if (isNearCellphone()) {
                    await createGetUserModal();
                } else if (isNearComputer()) {
                    await createUsersModal();
                } else if (isNearNotepad()) {
                    await createGoalsModal();
                }
            }
        });
        

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
class ManicureStudio extends Phaser.Scene {
    constructor() {
        super({ key: 'ManicureStudio' });
        this.selectedNail = null;
        this.selectedColor = null;
        this.selectedFinish = null;
        this.nailLength = 'short'; // Default nail length
        this.blingType = 'none'; // Default bling
        this.nails = [];
        this.finishes = ['matte', 'glossy', 'wet'];
    }

    preload() {
        console.log('Preloading game assets...');
    }

    create() {
        console.log('Creating game scene...');
        
        // Set background
        this.add.rectangle(400, 300, 800, 600, 0xFFF0F5);
        
        // Create title
        this.add.text(400, 30, 'Manicure Studio', {
            fontSize: '48px',
            fill: '#FF1493',
            fontFamily: 'Comic Sans MS, cursive',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Create table
        this.createTable();
        
        // Create framed picture
        this.createPicture();
        
        // Create manicurist character
        this.createManicurist();
        
        // Create customer hand with nails
        this.createHand();
        
        // Create color picker (HTML-based)
        this.createColorPicker();

        // Create finish picker (HTML-based)
        this.createFinishPicker();
        
        // Create game controls (HTML-based)
        this.createGameControls();

        // Create nail length picker
        this.createNailLengthPicker();

        // Create bling picker
        this.createBlingPicker();

        // Create sticker picker
        this.createStickerPicker();

        // Create nail status panel
        this.createNailStatusPanel();
        
        // Initialize status display
        this.updateNailStatus();
    }

    createNailGraphics() {
        // This will be used to create nail sprites
        this.nailGraphics = this.add.graphics();
    }

    createTable() {
        // Table surface (wood grain effect)
        const table = this.add.graphics();
        table.fillStyle(0x8B4513);
        table.fillRect(250, 400, 300, 100);
        // Wood grain lines
        table.lineStyle(1, 0x654321);
        for (let i = 0; i < 15; i++) {
            table.beginPath();
            table.moveTo(260 + i * 20, 410);
            table.lineTo(260 + i * 20, 490);
            table.strokePath();
        }
        // Table edge
        table.lineStyle(3, 0x654321);
        table.strokeRect(250, 400, 300, 100);

        // Table legs (more detailed)
        const leftLeg = this.add.graphics();
        leftLeg.fillStyle(0x654321);
        leftLeg.fillRoundedRect(245, 500, 30, 80, 5);
        // Leg details
        leftLeg.fillStyle(0x8B4513);
        leftLeg.fillRoundedRect(250, 505, 20, 70, 3);

        const rightLeg = this.add.graphics();
        rightLeg.fillStyle(0x654321);
        rightLeg.fillRoundedRect(525, 500, 30, 80, 5);
        rightLeg.fillStyle(0x8B4513);
        rightLeg.fillRoundedRect(530, 505, 20, 70, 3);
    }

    createPicture() {
        // Picture frame (more ornate)
        const frame = this.add.graphics();
        frame.fillStyle(0x8B4513);
        frame.fillRoundedRect(140, 330, 100, 120, 8);
        frame.lineStyle(4, 0xFFD700);
        frame.strokeRoundedRect(140, 330, 100, 120, 8);
        // Inner frame detail
        frame.lineStyle(2, 0xFFA500);
        frame.strokeRoundedRect(145, 335, 90, 110, 6);

        // Create Elphaba & Glinda graphics (more detailed)
        const picture = this.add.graphics();

        // Elphaba (left side) - green skin, black dress, dark hair
        picture.fillStyle(0x90EE90); // Green skin
        picture.fillCircle(155, 350, 16); // Head (moved right)
        picture.fillEllipse(155, 375, 20, 25); // Body

        // Elphaba's dark wavy hair (more realistic, within frame)
        picture.fillStyle(0x2F4F4F); // Dark hair
        picture.fillEllipse(155, 330, 22, 18); // Main hair
        picture.fillEllipse(143, 337, 10, 12); // Left strand
        picture.fillEllipse(167, 337, 10, 12); // Right strand
        // Hair texture
        picture.fillStyle(0x696969);
        picture.fillEllipse(155, 333, 16, 12);

        // Elphaba's black witch hat (smaller, within frame)
        picture.fillStyle(0x000000);
        picture.fillEllipse(155, 320, 16, 6); // Hat brim
        picture.fillRect(150, 315, 10, 12); // Hat cone

        // Elphaba's black dress with details
        picture.fillStyle(0x000000);
        picture.fillEllipse(155, 380, 20, 18); // Dress
        picture.fillStyle(0x2F4F4F);
        picture.fillEllipse(155, 383, 16, 12); // Dress shading

        // Glinda (right side) - pink dress, blonde hair, crown
        picture.fillStyle(0xFDBCB4); // Skin tone
        picture.fillCircle(195, 350, 16); // Head (moved left)
        picture.fillEllipse(195, 375, 20, 25); // Body

        // Glinda's blonde hair (more voluminous, within frame)
        picture.fillStyle(0xFFD700); // Blonde hair
        picture.fillEllipse(195, 330, 20, 16); // Main hair
        picture.fillEllipse(185, 337, 12, 12); // Left hair
        picture.fillEllipse(205, 337, 12, 12); // Right hair
        // Hair highlights
        picture.fillStyle(0xFFFFE0);
        picture.fillEllipse(195, 333, 14, 10);

        // Glinda's pink dress with details
        picture.fillStyle(0xFF69B4); // Pink dress
        picture.fillEllipse(195, 380, 20, 18);
        picture.fillStyle(0xFFB6C1);
        picture.fillEllipse(195, 383, 16, 12); // Dress shading

        // Glinda's golden crown (more detailed, within frame)
        picture.fillStyle(0xFFD700);
        picture.fillEllipse(195, 320, 14, 6); // Crown base
        picture.fillTriangle(188, 320, 195, 312, 202, 320); // Crown points
        picture.fillStyle(0xFFA500);
        picture.fillEllipse(195, 317, 10, 4); // Crown detail

        // Magic sparkles between them (more magical, within frame)
        picture.fillStyle(0xFFFFFF);
        for (let i = 0; i < 4; i++) {
            const sparkleX = 165 + i * 6;
            const sparkleY = 345 + Math.sin(i) * 6;
            picture.fillCircle(sparkleX, sparkleY, 2.5);
            picture.fillStyle(0xFFD700);
            picture.fillCircle(sparkleX, sparkleY, 1.2);
            picture.fillStyle(0xFFFFFF);
        }
    }

    createManicurist() {
        const manicurist = this.add.graphics();

        // Position manicurist on the right side
        const x = 650;
        const y = 250;

        // Boots (more detailed)
        manicurist.fillStyle(0xFF69B4); // Pink boots
        manicurist.fillEllipse(x - 15, y + 80, 22, 17);
        manicurist.fillEllipse(x + 15, y + 80, 22, 17);
        // Boot details
        manicurist.fillStyle(0xFFFFFF);
        manicurist.fillEllipse(x - 15, y + 75, 15, 8);
        manicurist.fillEllipse(x + 15, y + 75, 15, 8);

        // Legs (better shape)
        manicurist.fillStyle(0xFDBCB4); // Skin tone
        manicurist.fillRoundedRect(x - 12, y + 40, 10, 40, 5);
        manicurist.fillRoundedRect(x + 2, y + 40, 10, 40, 5);

        // Pink sleeveless dress with rose print (more detailed)
        manicurist.fillStyle(0xFF69B4); // Pink dress
        manicurist.fillRoundedRect(x - 22, y + 18, 44, 55, 12);
        // Dress neckline
        manicurist.fillStyle(0xFFFFFF);
        manicurist.fillRoundedRect(x - 18, y + 18, 36, 8, 4);

        // Rose print on dress (better roses)
        manicurist.fillStyle(0xFF1493); // Darker pink for roses
        // Left rose
        manicurist.fillCircle(x - 12, y + 35, 4);
        manicurist.fillStyle(0xFF69B4);
        manicurist.fillCircle(x - 12, y + 35, 2);
        // Right rose
        manicurist.fillStyle(0xFF1493);
        manicurist.fillCircle(x + 12, y + 45, 4);
        manicurist.fillStyle(0xFF69B4);
        manicurist.fillCircle(x + 12, y + 45, 2);
        // Center rose
        manicurist.fillStyle(0xFF1493);
        manicurist.fillCircle(x, y + 40, 3);

        // Arms (better proportions)
        manicurist.fillStyle(0xFDBCB4); // Skin tone
        manicurist.fillRoundedRect(x - 28, y + 23, 10, 28, 5);
        manicurist.fillRoundedRect(x + 18, y + 23, 10, 28, 5);

        // Head (slightly larger)
        manicurist.fillStyle(0xFDBCB4); // Skin tone
        manicurist.fillCircle(x, y, 22);

        // Longer blonde hair with pink streaks (more natural)
        manicurist.fillStyle(0xFFD700); // Blonde hair
        // Main hair body
        manicurist.fillEllipse(x, y - 12, 38, 28);
        // Hair layers for depth
        manicurist.fillEllipse(x - 2, y - 8, 32, 22);
        manicurist.fillEllipse(x + 2, y - 15, 28, 18);

        // Pink streaks in hair (more integrated)
        manicurist.fillStyle(0xFF69B4); // Pink streaks
        manicurist.fillEllipse(x - 10, y - 10, 8, 12);
        manicurist.fillEllipse(x + 14, y - 10, 8, 12);
        manicurist.fillEllipse(x - 3, y - 18, 6, 8);

        // Face features (more detailed)
        manicurist.fillStyle(0x000000); // Eyes
        manicurist.fillEllipse(x - 8, y - 3, 3, 2);
        manicurist.fillEllipse(x + 8, y - 3, 3, 2);
        // Eye highlights
        manicurist.fillStyle(0xFFFFFF);
        manicurist.fillEllipse(x - 7, y - 4, 1, 1);
        manicurist.fillEllipse(x + 9, y - 4, 1, 1);

        // Smile (more natural)
        manicurist.lineStyle(2, 0x000000);
        manicurist.beginPath();
        manicurist.arc(x, y + 6, 10, 0.2, Math.PI - 0.2);
        manicurist.strokePath();

        // Add label
        this.add.text(x, y + 105, 'Manicurist', {
            fontSize: '14px',
            fill: '#FF1493',
            fontFamily: 'Comic Sans MS, cursive'
        }).setOrigin(0.5);
    }

    createHand() {
        // Create hand shape with fingers (more polished)
        const hand = this.add.graphics();
        hand.fillStyle(0xFDBCB4);

        // Palm (more realistic oval)
        hand.fillEllipse(400, 380, 180, 110);

        // Fingers (better proportions)
        const fingerPositions = [
            { x: 320, y: 340, width: 22, height: 55, tipY: 315 }, // Thumb
            { x: 360, y: 320, width: 18, height: 65, tipY: 290 }, // Index
            { x: 400, y: 310, width: 18, height: 70, tipY: 275 }, // Middle
            { x: 440, y: 320, width: 18, height: 65, tipY: 290 }, // Ring
            { x: 480, y: 340, width: 18, height: 55, tipY: 315 }  // Pinky
        ];

        fingerPositions.forEach(finger => {
            // Finger base
            hand.fillRoundedRect(finger.x - finger.width/2, finger.y - finger.height/2, finger.width, finger.height, 8);
            // Finger tip (slightly rounded)
            hand.fillCircle(finger.x, finger.tipY, finger.width/2 + 2);
        });
        
        // Create 5 nails (positioned at finger tips)
        const nailPositions = [
            { x: 320, y: 312 }, // Thumb tip
            { x: 360, y: 287 }, // Index tip
            { x: 400, y: 272 }, // Middle tip
            { x: 440, y: 287 }, // Ring tip
            { x: 480, y: 312 }  // Pinky tip
        ];

        nailPositions.forEach((pos, index) => {
            const nail = this.add.graphics();
            const naturalColor = 0xFFE4C4; // More natural nail color (bisque)
            nail.fillStyle(naturalColor);
            nail.fillRoundedRect(pos.x - 15, pos.y - 25, 30, 40, 5);
            
            // Add natural nail shine
            nail.fillStyle(0xFFFFFF, 0.3);
            nail.fillRoundedRect(pos.x - 12, pos.y - 22, 10, 15, 3);
            
            // Make nail interactive
            const nailSprite = this.add.zone(pos.x, pos.y, 30, 40);
            nailSprite.setInteractive();
            nailSprite.setData('nailIndex', index);
            nailSprite.setData('graphics', nail);
            nailSprite.setData('color', '#FFE4C4'); // Natural color as string
            nailSprite.setData('finish', 'matte');
            nailSprite.setData('length', this.nailLength);
            nailSprite.setData('bling', this.blingType);
            nailSprite.setData('sticker', 'none');
            
            nailSprite.on('pointerdown', () => {
                this.selectNail(nailSprite);
            });
            
            this.nails.push(nailSprite);
        });
    }

    createColorPicker() {
        const colorContainer = document.getElementById('colorPicker');
        colorContainer.innerHTML = `
            <h3 style="color: #FF1493; font-size: 18px; margin: 0 0 10px 0;">Colors:</h3>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px;">
                <button class="colorBtn" style="background: #FF0000; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#FF0000"></button>
                <button class="colorBtn" style="background: #00FF00; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#00FF00"></button>
                <button class="colorBtn" style="background: #0000FF; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#0000FF"></button>
                <button class="colorBtn" style="background: #FFFF00; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#FFFF00"></button>
                <button class="colorBtn" style="background: #FF00FF; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#FF00FF"></button>
                <button class="colorBtn" style="background: #00FFFF; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#00FFFF"></button>
                <button class="colorBtn" style="background: #FFA500; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#FFA500"></button>
                <button class="colorBtn" style="background: #800080; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#800080"></button>
                <button class="colorBtn" style="background: #FFC0CB; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#FFC0CB"></button>
                <button class="colorBtn" style="background: #A52A2A; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#A52A2A"></button>
                <button class="colorBtn" style="background: #000000; width: 35px; height: 35px; border: 2px solid #FFF; border-radius: 5px; cursor: pointer;" data-color="#000000"></button>
                <button class="colorBtn" style="background: #FFFFFF; width: 35px; height: 35px; border: 2px solid #000; border-radius: 5px; cursor: pointer;" data-color="#FFFFFF"></button>
            </div>
        `;

        document.querySelectorAll('.colorBtn').forEach(button => {
            button.addEventListener('click', () => {
                const color = button.getAttribute('data-color');
                this.selectColor(color);
            });
        });
    }

    createFinishPicker() {
        const finishContainer = document.getElementById('finishPicker');
        finishContainer.innerHTML = `
            <h3 style="color: #FF1493; font-size: 18px; margin: 20px 0 10px 0;">Finish:</h3>
            <button id="matteFinish" style="background: #E6E6E6; color: #000; border: 2px solid #808080; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Matte</button>
            <button id="glossyFinish" style="background: #FFF8DC; color: #000; border: 2px solid #DAA520; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Glossy</button>
            <button id="wetFinish" style="background: #E0FFFF; color: #000; border: 2px solid #4682B4; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Wet Look</button>
        `;

        document.getElementById('matteFinish').addEventListener('click', () => {
            this.selectFinish('matte');
        });

        document.getElementById('glossyFinish').addEventListener('click', () => {
            this.selectFinish('glossy');
        });

        document.getElementById('wetFinish').addEventListener('click', () => {
            this.selectFinish('wet');
        });
    }

    createGameControls() {
        const controlsContainer = document.getElementById('gameControls');
        controlsContainer.innerHTML = `
            <button id="saveButton" style="background: #90EE90; color: #000; border: 2px solid #228B22; border-radius: 10px; padding: 12px 20px; margin: 10px 0; font-size: 16px; font-weight: bold; cursor: pointer; width: 100%;">💾 Save Manicure</button>
            <div style="color: #FF1493; font-size: 14px; text-align: center; margin-top: 10px;">
                Click a nail, then choose options above!
            </div>
        `;

        document.getElementById('saveButton').addEventListener('click', () => {
            this.saveManicure();
        });
    }

    createNailLengthPicker() {
        const lengthContainer = document.getElementById('nailLengthPicker');
        lengthContainer.innerHTML = `
            <h3 style="color: #FF1493; font-size: 18px; margin: 20px 0 10px 0;">Nail Length:</h3>
            <button id="shortNails" style="background: #FFB6C1; color: #000; border: 2px solid #FF1493; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Short</button>
            <button id="longNails" style="background: #90EE90; color: #000; border: 2px solid #228B22; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Long</button>
        `;

        document.getElementById('shortNails').addEventListener('click', () => {
            this.setNailLength('short');
        });

        document.getElementById('longNails').addEventListener('click', () => {
            this.setNailLength('long');
        });
    }

    createBlingPicker() {
        const blingContainer = document.getElementById('blingPicker');
        blingContainer.innerHTML = `
            <h3 style="color: #FF1493; font-size: 18px; margin: 20px 0 10px 0;">Diamonds & Bling:</h3>
            <button id="noBling" style="background: #D3D3D3; color: #000; border: 2px solid #696969; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">None</button>
            <button id="smallDiamonds" style="background: #E6E6FA; color: #000; border: 2px solid #9370DB; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Small Diamonds</button>
            <button id="largeBling" style="background: #FFFACD; color: #000; border: 2px solid #FFD700; border-radius: 10px; padding: 10px 15px; margin: 5px; font-size: 14px; cursor: pointer;">Large Bling</button>
        `;

        document.getElementById('noBling').addEventListener('click', () => {
            this.setBling('none');
        });

        document.getElementById('smallDiamonds').addEventListener('click', () => {
            this.setBling('small');
        });

        document.getElementById('largeBling').addEventListener('click', () => {
            this.setBling('large');
        });
    }

    createStickerPicker() {
        const stickerContainer = document.getElementById('stickerPicker');
        stickerContainer.innerHTML = `
            <h3 style="color: #FF1493; font-size: 18px; margin: 20px 0 10px 0;">Nail Stickers:</h3>
            <button id="noSticker" style="background: #F0F0F0; color: #000; border: 2px solid #808080; border-radius: 10px; padding: 8px 12px; margin: 3px; font-size: 12px; cursor: pointer;">None</button>
            <button id="heartSticker" style="background: #FFB6C1; color: #000; border: 2px solid #FF69B4; border-radius: 10px; padding: 8px 12px; margin: 3px; font-size: 12px; cursor: pointer;">❤️</button>
            <button id="starSticker" style="background: #FFFACD; color: #000; border: 2px solid #FFD700; border-radius: 10px; padding: 8px 12px; margin: 3px; font-size: 12px; cursor: pointer;">⭐</button>
            <button id="flowerSticker" style="background: #98FB98; color: #000; border: 2px solid #32CD32; border-radius: 10px; padding: 8px 12px; margin: 3px; font-size: 12px; cursor: pointer;">🌸</button>
            <button id="butterflySticker" style="background: #E6E6FA; color: #000; border: 2px solid #9370DB; border-radius: 10px; padding: 8px 12px; margin: 3px; font-size: 12px; cursor: pointer;">🦋</button>
        `;

        document.getElementById('noSticker').addEventListener('click', () => {
            this.setSticker('none');
        });

        document.getElementById('heartSticker').addEventListener('click', () => {
            this.setSticker('heart');
        });

        document.getElementById('starSticker').addEventListener('click', () => {
            this.setSticker('star');
        });

        document.getElementById('flowerSticker').addEventListener('click', () => {
            this.setSticker('flower');
        });

        document.getElementById('butterflySticker').addEventListener('click', () => {
            this.setSticker('butterfly');
        });
    }

    createNailStatusPanel() {
        const statusContainer = document.getElementById('nailStatus');
        statusContainer.innerHTML = `
            <h2 style="color: #FF1493; font-size: 20px; margin: 0 0 15px 0; text-align: center;">Nail Settings</h2>
            <div id="nailList"></div>
        `;

        const nailList = document.getElementById('nailList');
        const nailNames = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
        this.nailStatusTexts = [];

        nailNames.forEach((name, index) => {
            const nailDiv = document.createElement('div');
            nailDiv.style.marginBottom = '15px';
            nailDiv.innerHTML = `
                <div style="color: #FF1493; font-size: 16px; font-weight: bold;">${name}:</div>
                <div style="color: #000; font-size: 14px; margin: 5px 0;">Color: <span id="color-${index}">Natural</span></div>
                <div style="color: #000; font-size: 14px; margin: 5px 0;">Finish: <span id="finish-${index}">Matte</span></div>
                <div style="color: #000; font-size: 14px; margin: 5px 0;">Sticker: <span id="sticker-${index}">None</span></div>
            `;
            nailList.appendChild(nailDiv);

            this.nailStatusTexts.push({
                color: { setText: (text) => document.getElementById(`color-${index}`).textContent = text.split(': ')[1] },
                finish: { setText: (text) => document.getElementById(`finish-${index}`).textContent = text.split(': ')[1] },
                sticker: { setText: (text) => document.getElementById(`sticker-${index}`).textContent = text.split(': ')[1] },
                nailIndex: index
            });
        });
    }

selectNail(nail) {
        console.log('Nail selected:', nail.getData('nailIndex'));
        
        // Clear previous selection
        this.nails.forEach(n => {
            const graphics = n.getData('graphics');
            graphics.clear();
            const currentColor = n.getData('color');
            console.log('Redrawing nail with color:', currentColor);
            graphics.fillStyle(parseInt(currentColor.replace('#', '0x')));
            graphics.fillRoundedRect(n.x - 15, n.y - 25, 30, 40, 5);
            
            // Add natural shine for all nails
            graphics.fillStyle(0xFFFFFF, 0.3);
            graphics.fillRoundedRect(n.x - 12, n.y - 22, 10, 15, 3);
        });

        // Highlight selected nail
        this.selectedNail = nail;
        const graphics = nail.getData('graphics');
        graphics.clear();
        const currentColor = nail.getData('color');
        console.log('Highlighting selected nail with color:', currentColor);
        graphics.fillStyle(parseInt(currentColor.replace('#', '0x')));
        graphics.fillRoundedRect(nail.x - 15, n.y - 25, 30, 40, 5);
        
        // Add natural shine
        graphics.fillStyle(0xFFFFFF, 0.3);
        graphics.fillRoundedRect(n.x - 12, n.y - 22, 10, 15, 3);
        
        graphics.lineStyle(3, 0xFFD700);
        graphics.strokeRoundedRect(nail.x - 15, n.y - 25, 30, 40, 5);
    }

    selectColor(color) {
        console.log('Color selected:', color);
        
        if (!this.selectedNail) {
            this.showMessage('Select a nail first!');
            return;
        }

        this.selectedColor = color;
        this.selectedNail.setData('color', color);
        console.log('Applied color to nail:', color);
        this.applyNailStyle();
        this.updateNailStatus();
    }

    selectFinish(finish) {
        console.log('Finish selected:', finish);
        
        if (!this.selectedNail) {
            this.showMessage('Select a nail first!');
            return;
        }

        this.selectedFinish = finish;
        this.selectedNail.setData('finish', finish);
        console.log('Applied finish to nail:', finish);
        this.applyNailStyle();
        this.updateNailStatus();
    }

    applyNailStyle() {
        if (this.selectedNail) {
            this.applyNailStyleToNail(this.selectedNail);
        }
    }

    updateNailStatus() {
        this.nails.forEach((nail, index) => {
            const color = nail.getData('color');
            const finish = nail.getData('finish');
            const sticker = nail.getData('sticker');

            if (this.nailStatusTexts[index]) {
                this.nailStatusTexts[index].color.setText(`Color: ${this.getColorName(color)}`);
                this.nailStatusTexts[index].finish.setText(`Finish: ${this.getFinishName(finish)}`);
                this.nailStatusTexts[index].sticker.setText(`Sticker: ${this.getStickerName(sticker)}`);
            }
        });
    }

    getColorName(colorHex) {
        // Simple color name mapping for display
        const colorMap = {
            '#ff0000': 'Red',
            '#00ff00': 'Green',
            '#0000ff': 'Blue',
            '#ffff00': 'Yellow',
            '#ff00ff': 'Magenta',
            '#00ffff': 'Cyan',
            '#ffa500': 'Orange',
            '#800080': 'Purple',
            '#ffc0cb': 'Pink',
            '#a52a2a': 'Brown',
            '#000000': 'Black',
            '#ffffff': 'White'
        };
        return colorMap[colorHex.toLowerCase()] || 'Custom';
    }

    getFinishName(finish) {
        const finishMap = {
            'matte': 'Matte',
            'glossy': 'Glossy',
            'wet': 'Wet Look'
        };
        return finishMap[finish] || 'Unknown';
    }

    setNailLength(length) {
        console.log('Nail length set to:', length);
        this.nailLength = length;

        // Update all nails to new length
        this.nails.forEach(nail => {
            nail.setData('length', length);
            this.applyNailStyleToNail(nail);
        });

        this.showMessage(`Nails set to ${length}!`);
    }

    setBling(bling) {
        console.log('Bling set to:', bling);
        this.blingType = bling;

        // Update all nails with new bling
        this.nails.forEach(nail => {
            nail.setData('bling', bling);
            this.applyNailStyleToNail(nail);
        });

        this.showMessage(`Bling set to ${this.getBlingName(bling)}!`);
    }

    setSticker(sticker) {
        console.log('Sticker set to:', sticker);

        if (!this.selectedNail) {
            this.showMessage('Select a nail first!');
            return;
        }

        this.selectedNail.setData('sticker', sticker);
        this.applyNailStyleToNail(this.selectedNail);
        this.updateNailStatus();
        this.showMessage(`Sticker applied: ${this.getStickerName(sticker)}!`);
    }

    getBlingName(bling) {
        const blingMap = {
            'none': 'None',
            'small': 'Small Diamonds',
            'large': 'Large Bling'
        };
        return blingMap[bling] || 'Unknown';
    }

    getStickerName(sticker) {
        const stickerMap = {
            'none': 'None',
            'heart': 'Heart',
            'star': 'Star',
            'flower': 'Flower',
            'butterfly': 'Butterfly'
        };
        return stickerMap[sticker] || 'Unknown';
    }

    drawSticker(graphics, x, y, width, height, stickerType) {
        const stickerSize = Math.min(width, height) / 4;

        switch (stickerType) {
            case 'heart':
                // Draw heart shape
                graphics.fillStyle(0xFF69B4);
                graphics.beginPath();
                graphics.moveTo(x, y - stickerSize/2);
                graphics.bezierCurveTo(x + stickerSize/2, y - stickerSize, x + stickerSize/2, y + stickerSize/2, x, y + stickerSize);
                graphics.bezierCurveTo(x - stickerSize/2, y + stickerSize/2, x - stickerSize/2, y - stickerSize, x, y - stickerSize/2);
                graphics.closePath();
                graphics.fill();
                break;

            case 'star':
                // Draw star shape
                graphics.fillStyle(0xFFD700);
                const spikes = 5;
                const outerRadius = stickerSize;
                const innerRadius = stickerSize / 2;
                graphics.beginPath();
                for (let i = 0; i < spikes * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / spikes;
                    const xPos = x + Math.cos(angle) * radius;
                    const yPos = y + Math.sin(angle) * radius;
                    if (i === 0) {
                        graphics.moveTo(xPos, yPos);
                    } else {
                        graphics.lineTo(xPos, yPos);
                    }
                }
                graphics.closePath();
                graphics.fill();
                break;

            case 'flower':
                // Draw simple flower
                graphics.fillStyle(0xFF69B4);
                // Center
                graphics.fillCircle(x, y, stickerSize / 3);
                // Petals
                for (let i = 0; i < 6; i++) {
                    const petalX = x + Math.cos((i * Math.PI) / 3) * stickerSize / 2;
                    const petalY = y + Math.sin((i * Math.PI) / 3) * stickerSize / 2;
                    graphics.fillCircle(petalX, petalY, stickerSize / 4);
                }
                break;

            case 'butterfly':
                // Draw simple butterfly
                graphics.fillStyle(0x9370DB);
                // Wings
                graphics.fillEllipse(x - stickerSize/2, y, stickerSize/2, stickerSize/3);
                graphics.fillEllipse(x + stickerSize/2, y, stickerSize/2, stickerSize/3);
                // Body
                graphics.fillStyle(0x000000);
                graphics.fillRect(x - 2, y - stickerSize/4, 4, stickerSize/2);
                break;
        }
    }

    applyNailStyleToNail(nail) {
        if (!nail) return;

        const graphics = nail.getData('graphics');
        const color = nail.getData('color');
        const finish = nail.getData('finish');
        const length = nail.getData('length') || this.nailLength;
        const bling = nail.getData('bling') || this.blingType;

        console.log('Applying style to nail - color:', color, 'finish:', finish, 'length:', length, 'bling:', bling);

        graphics.clear();

        // Adjust nail size based on length
        const baseWidth = 30;
        const baseHeight = 40;
        const lengthMultiplier = length === 'long' ? 1.3 : 1.0;
        const width = baseWidth * lengthMultiplier;
        const height = baseHeight * lengthMultiplier;

        // Convert hex string to number for Phaser
        const colorNumber = parseInt(color.replace('#', '0x'));
        graphics.fillStyle(colorNumber);
        graphics.fillRoundedRect(nail.x - width/2, nail.y - height/2, width, height, 5);

        // Apply finish effects
        if (finish === 'matte') {
            // Matte finish - no shine, flat appearance
        } else if (finish === 'glossy') {
            // Glossy finish - subtle shine
            graphics.fillStyle(0xFFFFFF, 0.4);
            graphics.fillRoundedRect(nail.x - width/2 + 2, nail.y - height/2 + 2, width - 4, height - 4, 3);
            graphics.lineStyle(1, 0xFFFFFF, 0.6);
            graphics.strokeRoundedRect(nail.x - width/2, nail.y - height/2, width, height, 5);
        } else if (finish === 'wet') {
            // Wet look - high gloss with multiple light reflections
            graphics.fillStyle(0xFFFFFF, 0.6);
            graphics.fillRoundedRect(nail.x - width/2 + 2, nail.y - height/2 + 2, width - 4, height - 4, 3);
            graphics.fillStyle(0xFFFFFF, 0.3);
            graphics.fillCircle(nail.x + width/4, nail.y - height/4, Math.min(width, height) / 6);
            graphics.lineStyle(2, 0xFFFFFF, 0.8);
            graphics.strokeRoundedRect(nail.x - width/2, nail.y - height/2, width, height, 5);
            graphics.lineStyle(1, 0x000000, 0.2);
            graphics.strokeRoundedRect(nail.x - width/2 - 1, nail.y - height/2 - 1, width + 2, height + 2, 6);
        }

        // Apply bling
        if (bling === 'small') {
            // Small diamonds
            graphics.fillStyle(0xFFFFFF);
            graphics.fillCircle(nail.x - width/4, nail.y - height/4, 3);
            graphics.fillCircle(nail.x + width/4, nail.y + height/4, 3);
        } else if (bling === 'large') {
            // Large bling
            graphics.fillStyle(0xFFD700);
            graphics.fillCircle(nail.x, nail.y, 5);
            graphics.fillStyle(0xFFFFFF);
            graphics.fillCircle(nail.x, nail.y, 3);
        }

        // Apply sticker
        if (sticker !== 'none') {
            this.drawSticker(graphics, nail.x, nail.y, width, height, sticker);
        }

        // Highlight selected nail
        if (this.selectedNail === nail) {
            graphics.lineStyle(3, 0xFFD700);
            graphics.strokeRoundedRect(nail.x - width/2, nail.y - height/2, width, height, 5);
        }
    }

    showMessage(text) {
        const message = this.add.text(400, 100, text, {
            fontSize: '20px',
            fill: '#FF1493',
            fontFamily: 'Comic Sans MS, cursive',
            backgroundColor: '#FFFFFF',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            message.destroy();
        });
    }

    saveManicure() {
        console.log('Attempting to save manicure...');
        
        try {
            // Use Phaser's screenshot functionality for better reliability
            this.game.renderer.snapshot((snapshot) => {
                console.log('Screenshot captured, creating download...');
                
                // Create a temporary canvas to ensure proper rendering
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = snapshot.width;
                tempCanvas.height = snapshot.height;
                
                // Draw the snapshot onto the temp canvas
                tempCtx.drawImage(snapshot, 0, 0);
                
                // Create download link
                const link = document.createElement('a');
                link.download = 'my-manicure.png';
                link.href = tempCanvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log('Manicure saved successfully!');
                this.showMessage('Manicure saved!');
            });
        } catch (error) {
            console.error('Error saving manicure:', error);
            this.showMessage('Error saving - try again!');
        }
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    backgroundColor: '#FFE4E1',
    scene: ManicureStudio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// Initialize the game
const game = new Phaser.Game(config);
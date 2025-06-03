document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let isDarkMode = false;
    let loadingComplete = false;
    
    // DOM elements
    const body = document.querySelector('body');
    const themeToggle = document.getElementById('theme-toggle');
    const preloader = document.getElementById('preloader');
    const hexagramCards = document.querySelectorAll('.hexagram-card');
    const yinYangEl = document.getElementById('yin-yang');
    const castButton = document.getElementById('cast-button');
    const resetButton = document.getElementById('reset-button');
    const aboutButton = document.getElementById('about-button');
    const resultContainer = document.getElementById('result-container');
    
    // Show preloader before content loads
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger intro animations
                document.querySelectorAll('.animate-in').forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 100 * index);
                });
                loadingComplete = true;
            }, 600);
        }
    }, 2000);
    
    // Initialize parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('mousemove', (e) => {
        if (!loadingComplete) return;
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth')) || 0.1;
            const moveX = (mouseX - 0.5) * depth * 50;
            const moveY = (mouseY - 0.5) * depth * 50;
            
            el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });
    
    // Rotating hexagrams background
    const bgHexagrams = document.querySelectorAll('.bg-hexagram');
    bgHexagrams.forEach((hex, index) => {
        const animDelay = index * 0.6;
        hex.style.animationDelay = `${animDelay}s`;
    });
    
    // Rotate Yin-Yang symbol slowly
    if (yinYangEl) {
        setInterval(() => {
            const currentRotation = parseFloat(getComputedStyle(yinYangEl).getPropertyValue('--rotation')) || 0;
            yinYangEl.style.setProperty('--rotation', (currentRotation + 1) % 360);
        }, 50);
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            body.classList.toggle('dark-mode', isDarkMode);
            themeToggle.querySelector('span').textContent = isDarkMode ? '☀️' : '🌙';
            
            // Update theme colors for cards and gradients
            if (isDarkMode) {
                document.documentElement.style.setProperty('--primary-bg', '#121212');
                document.documentElement.style.setProperty('--card-bg', '#1E1E1E');
                document.documentElement.style.setProperty('--text-color', '#E0CBAF');
                document.documentElement.style.setProperty('--accent-color', '#BFA77A');
            } else {
                document.documentElement.style.setProperty('--primary-bg', '#F6F1ED');
                document.documentElement.style.setProperty('--card-bg', '#FFFDF8');
                document.documentElement.style.setProperty('--text-color', '#333333');
                document.documentElement.style.setProperty('--accent-color', '#7B5C2B');
            }
        });
    }
    
    // Hexagram data and functions
    const guaData = [
        { name: "乾", symbol: "☰", description: "元亨利貞。象徵天、剛健。" },
        { name: "坤", symbol: "☷", description: "元亨，利牝馬之貞。君子有攸往，先迷後得主，利西南得朋，東北喪朋。安貞，吉。象徵地、柔順。" },
        { name: "屯", symbol: "☵☳", description: "元亨，利貞，勿用有攸往，利建侯。象徵初生、艱難。" },
        { name: "蒙", symbol: "☶☵", description: "亨。匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆則不告。利貞。象徵蒙昧、啟蒙。" },
        { name: "需", symbol: "☵☰", description: "有孚，光亨，貞吉。利涉大川。象徵等待、期待。" },
        { name: "訟", symbol: "☰☵", description: "有孚，窒。惕中吉，終凶。利見大人，不利涉大川。象徵爭訟、爭端。" },
        { name: "師", symbol: "☷☵", description: "貞，丈人，吉无咎。象徵軍隊、戰爭。" },
        { name: "比", symbol: "☵☷", description: "吉。原筮，元永貞，无咎。不寧方來，後夫凶。象徵親密、親附。" },
        { name: "小畜", symbol: "☴☰", description: "亨。密雲不雨，自我西郊。象徵小有積蓄。" },
        { name: "履", symbol: "☰☱", description: "履虎尾，不咥人，亨。象徵履行、踐行。" },
        { name: "泰", symbol: "☷☰", description: "小往大來，吉，亨。象徵通泰、安泰。" },
        { name: "否", symbol: "☰☷", description: "否之匪人，不利君子貞，大往小來。象徵閉塞、不通。" },
        { name: "同人", symbol: "☰☲", description: "同人於野，亨。利涉大川，利君子貞。象徵和同、團結。" },
        { name: "大有", symbol: "☲☰", description: "元亨。象徵大有收穫。" },
        { name: "謙", symbol: "☷☶", description: "亨，君子有終。象徵謙虛、謙遜。" },
        { name: "豫", symbol: "☳☷", description: "利建侯行師。象徵安樂、愉悅。" },
        { name: "隨", symbol: "☱☳", description: "元亨利貞，无咎。象徵隨從、追隨。" },
        { name: "蠱", symbol: "☶☴", description: "元亨，利涉大川。先甲三日，後甲三日。象徵整治、革新。" },
        { name: "臨", symbol: "☷☱", description: "元亨，利貞。至於八月有凶。象徵監臨、統治。" },
        { name: "觀", symbol: "☴☷", description: "盥而不薦，有孚顒若。象徵觀察、瞻仰。" },
        { name: "噬嗑", symbol: "☲☳", description: "亨。利用獄。象徵咬合、刑罰。" },
        { name: "賁", symbol: "☶☲", description: "亨。小利有攸往。象徵文飾、修飾。" },
        { name: "剝", symbol: "☶☷", description: "不利有攸往。象徵剝落、侵蝕。" },
        { name: "復", symbol: "☷☳", description: "亨。出入无疾，朋來无咎。反復其道，七日來復，利有攸往。象徵回復、回歸。" },
        { name: "无妄", symbol: "☰☳", description: "元亨，利貞。其匪正有眚，不利有攸往。象徵不妄為、真實。" },
        { name: "大畜", symbol: "☶☰", description: "利貞，不家食，吉。象徵大積蓄、準備。" },
        { name: "頤", symbol: "☶☳", description: "貞吉。觀頤，自求口實。象徵頤養、保養。" },
        { name: "大過", symbol: "☱☴", description: "棟橈，利有攸往，亨。象徵過度、大的過失。" },
        { name: "坎", symbol: "☵", description: "習坎，有孚，維心亨，行有尚。象徵險阻、坎坷。" },
        { name: "離", symbol: "☲", description: "利貞，亨。畜牝牛，吉。象徵附著、光明。" },
        { name: "咸", symbol: "☱☶", description: "亨，利貞，取女吉。象徵感應、交感。" },
        { name: "恆", symbol: "☳☴", description: "亨，无咎，利貞，利有攸往。象徵恆久、持久。" },
        { name: "遯", symbol: "☰☶", description: "亨，小利貞。象徵退避、隱遁。" },
        { name: "大壯", symbol: "☳☰", description: "利貞。象徵強盛、壯大。" },
        { name: "晉", symbol: "☲☷", description: "康侯用錫馬蕃庶，晝日三接。象徵前進、晉升。" },
        { name: "明夷", symbol: "☷☲", description: "利艱貞。象徵光明受損、艱難。" },
        { name: "家人", symbol: "☴☲", description: "利女貞。象徵家庭、家族。" },
        { name: "睽", symbol: "☲☱", description: "小事吉。象徵背離、乖離。" },
        { name: "蹇", symbol: "☵☶", description: "利西南，不利東北；利見大人，貞吉。象徵艱難、險阻。" },
        { name: "解", symbol: "☳☵", description: "利西南，无所往，其來復吉。有攸往，夙吉。象徵緩解、解除。" },
        { name: "損", symbol: "☶☱", description: "有孚，元吉，无咎，可貞，利有攸往。曷之用？二簋可用享。象徵減損、損失。" },
        { name: "益", symbol: "☴☳", description: "利有攸往，利涉大川。象徵增益、利益。" },
        { name: "夬", symbol: "☱☰", description: "揚於王庭，孚號，有厲，告自邑，不利即戎，利有攸往。象徵決斷、決裂。" },
        { name: "姤", symbol: "☰☴", description: "女壯，勿用取女。象徵相遇、邂逅。" },
        { name: "萃", symbol: "☱☷", description: "亨。王假有廟，利見大人，亨，利貞。用大牲吉，利有攸往。象徵聚合、聚集。" },
        { name: "升", symbol: "☷☴", description: "元亨，用見大人，勿恤，南征吉。象徵上升、長進。" },
        { name: "困", symbol: "☱☵", description: "亨，貞，大人吉，无咎，有言不信。象徵困窮、困境。" },
        { name: "井", symbol: "☵☴", description: "改邑不改井，无喪无得，往來井井。汔至，亦未繘井，羸其瓶，凶。象徵水井、養人。" },
        { name: "革", symbol: "☱☲", description: "己日乃孚，元亨，利貞，悔亡。象徵變革、革新。" },
        { name: "鼎", symbol: "☲☴", description: "元吉，亨。象徵鼎器、穩定。" },
        { name: "震", symbol: "☳", description: "亨。震來虩虩，笑言啞啞。震驚百里，不喪匕鬯。象徵震動、震撼。" },
        { name: "艮", symbol: "☶", description: "艮其背，不獲其身；行其庭，不見其人，无咎。象徵靜止、止欲。" },
        { name: "漸", symbol: "☴☶", description: "女歸吉，利貞。象徵漸進、逐漸。" },
        { name: "歸妹", symbol: "☳☱", description: "征凶，无攸利。象徵婚嫁、歸往。" },
        { name: "豐", symbol: "☳☲", description: "亨，王假之，勿憂，宜日中。象徵豐盛、盛大。" },
        { name: "旅", symbol: "☲☶", description: "小亨，旅貞吉。象徵旅行、旅居。" },
        { name: "巽", symbol: "☴", description: "小亨，利攸往，利見大人。象徵順從、謙遜。" },
        { name: "兌", symbol: "☱", description: "亨，利貞。象徵喜悅、和悅。" },
        { name: "渙", symbol: "☴☵", description: "亨。王假有廟，利涉大川，利貞。象徵渙散、離散。" },
        { name: "節", symbol: "☵☱", description: "亨。苦節不可貞。象徵節制、節儉。" },
        { name: "中孚", symbol: "☴☱", description: "豚魚吉，利涉大川，利貞。象徵誠信、孚信。" },
        { name: "小過", symbol: "☳☶", description: "亨，利貞，可小事，不可大事。飛鳥遺之音，不宜上宜下，大吉。象徵小有過越。" },
        { name: "既濟", symbol: "☵☲", description: "亨，小利貞，初吉終亂。象徵已經完成、成功。" },
        { name: "未濟", symbol: "☲☵", description: "亨，小狐汔濟，濡其尾，无攸利。象徵尚未完成、有待努力。" }
    ];

    function generateHexagram() {
        const lines = [];
        const changingLines = [];
        for (let i = 0; i < 6; i++) {
            const rand = Math.random();
            let line;
            if (rand < 0.0625) {       // 老陰，動爻，陰變陽
                line = 0;
                changingLines.push(i);
            } else if (rand < 0.3125) { // 少陽，不動，陽
                line = 1;
            } else if (rand < 0.6875) { // 少陰，不動，陰
                line = 0;
            } else {                    // 老陽，動爻，陽變陰
                line = 1;
                changingLines.push(i);
            }
            lines.push(line);
        }
        
        // 確保至少有一個動爻
        if (changingLines.length === 0) {
            const randomLine = Math.floor(Math.random() * 6);
            changingLines.push(randomLine);
            // 不改變原本的爻值，只是標記它為動爻
        }
        
        const changedLines = [...lines];
        changingLines.forEach(pos => {
            changedLines[pos] = 1 - changedLines[pos];
        });
        
        return { 
            lines, 
            changingLines, 
            changedLines 
        };
    }

    function getGuaData(lines) {
        // 構建卦象查找映射（確保每次都重新構建）
        window.guaSymbolMap = {};
        guaData.forEach(gua => {
            window.guaSymbolMap[gua.symbol] = gua;
        });

        // 按照占卜規律：左三爻為上卦，右三爻為下卦，上卦在上，下卦在下
        const upperTrigram = getTrigramSymbol(lines.slice(0, 3)); // 左三爻（索引0-2）為上卦
        const lowerTrigram = getTrigramSymbol(lines.slice(3, 6)); // 右三爻（索引3-5）為下卦
        
        // 符號順序為上卦+下卦(原先是upperTrigram + lowerTrigram但卻一直變成下卦在上，上卦在下，所以我手動修正)
        const guaSymbol = lowerTrigram + upperTrigram;
        
        // 如果是純卦（上下卦相同），則只用一個符號表示
        const finalSymbol = (upperTrigram === lowerTrigram) ? upperTrigram : guaSymbol;
        
        // 直接從映射中查找
        const foundGua = window.guaSymbolMap[finalSymbol];
        if (foundGua) {
            return foundGua;
        }
        
        // 檢查是不是八純卦之一
        if (lowerTrigram === upperTrigram) {
            // 如果是純卦，直接從八卦查找
            for (let i = 0; i < guaData.length; i++) {
                if (guaData[i].symbol === lowerTrigram) {
                    return guaData[i];
                }
            }
        }
        
        // 直接使用用戶提供的對應關係，以確保精確匹配
        const hexagramMap = {
            // 八純卦
            "☰": guaData[0],    // 乾
            "☷": guaData[1],    // 坤
            "☵": guaData[28],   // 坎
            "☲": guaData[29],   // 離
            "☳": guaData[50],   // 震
            "☶": guaData[51],   // 艮
            "☴": guaData[56],   // 巽
            "☱": guaData[57],   // 兌
            
            // 複卦 - 根據用戶提供的資料
            "☵☳": guaData[2],   // 屯
            "☶☵": guaData[3],   // 蒙
            "☵☰": guaData[4],   // 需
            "☰☵": guaData[5],   // 訟
            "☷☵": guaData[6],   // 師
            "☵☷": guaData[7],   // 比
            "☴☰": guaData[8],   // 小畜
            "☰☱": guaData[9],   // 履
            "☷☰": guaData[10],  // 泰
            "☰☷": guaData[11],  // 否
            "☰☲": guaData[12],  // 同人
            "☲☰": guaData[13],  // 大有
            "☷☶": guaData[14],  // 謙
            "☳☷": guaData[15],  // 豫
            "☱☳": guaData[16],  // 隨
            "☶☴": guaData[17],  // 蠱
            "☷☱": guaData[18],  // 臨
            "☴☷": guaData[19],  // 觀
            "☲☳": guaData[20],  // 噬嗑
            "☶☲": guaData[21],  // 賁
            "☶☷": guaData[22],  // 剝
            "☷☳": guaData[23],  // 復
            "☰☳": guaData[24],  // 无妄
            "☶☰": guaData[25],  // 大畜
            "☶☳": guaData[26],  // 頤
            "☱☴": guaData[27],  // 大過
            "☱☶": guaData[30],  // 咸
            "☳☴": guaData[31],  // 恆
            "☰☶": guaData[32],  // 遯
            "☳☰": guaData[33],  // 大壯
            "☲☷": guaData[34],  // 晉
            "☷☲": guaData[35],  // 明夷
            "☴☲": guaData[36],  // 家人
            "☲☱": guaData[37],  // 睽
            "☵☶": guaData[38],  // 蹇
            "☳☵": guaData[39],  // 解
            "☶☱": guaData[40],  // 損
            "☴☳": guaData[41],  // 益
            "☱☰": guaData[42],  // 夬
            "☰☴": guaData[43],  // 姤
            "☱☷": guaData[44],  // 萃
            "☷☴": guaData[45],  // 升
            "☱☵": guaData[46],  // 困
            "☵☴": guaData[47],  // 井
            "☱☲": guaData[48],  // 革
            "☲☴": guaData[49],  // 鼎
            "☴☶": guaData[52],  // 漸
            "☳☱": guaData[53],  // 歸妹
            "☳☲": guaData[54],  // 豐
            "☲☶": guaData[55],  // 旅
            "☴☵": guaData[58],  // 渙
            "☵☱": guaData[59],  // 節
            "☴☱": guaData[60],  // 中孚
            "☳☶": guaData[61],  // 小過
            "☵☲": guaData[62],  // 既濟
            "☲☵": guaData[63]   // 未濟
        };
        
        // 通過組合的上下卦查找
        if (hexagramMap[guaSymbol]) {
            return hexagramMap[guaSymbol];
        }
        
        // 最後的保障措施，確保不會返回未知卦象
        // 根據卦象的編號查找
        let binary = 0;
        for (let i = 0; i < lines.length; i++) {
            binary = (binary << 1) | (lines[i] === 1 ? 1 : 0);
        }
        // 限制在有效範圍內
        binary = binary % 64;
        
        return guaData[binary];
    }
    
    // 計算卦象索引（0-63）
    function calculateGuaIndex(lines) {
        let result = 0;
        for (let i = 0; i < 6; i++) {
            result = (result << 1) | (lines[i] === 1 ? 1 : 0);
        }
        return result;
    }
    
    // 將三爻陣列轉換為八卦符號
    function getTrigramSymbol(trigram) {
        // 為了確保處理，先將陣列轉換為二進制數字
        let binary = 0;
        for (let i = 0; i < trigram.length; i++) {
            binary = (binary << 1) | (trigram[i] === 1 ? 1 : 0);
        }
        
        // 根據二進制值返回相應的八卦符號
        switch(binary) {
            case 7: return "☰"; // 乾 (111)
            case 0: return "☷"; // 坤 (000)
            case 4: return "☳"; // 震 (100)
            case 1: return "☶"; // 艮 (001)
            case 5: return "☲"; // 離 (101)
            case 2: return "☵"; // 坎 (010)
            case 6: return "☱"; // 兌 (110)
            case 3: return "☴"; // 巽 (011)
            default:
                console.error("無法識別的三爻組合:", trigram);
                return "☰"; // 如果發生錯誤，默認返回乾卦
        }
    }
    
    // 用於調試：顯示卦象的詳細信息
    function debugGua(name, lines, symbol) {
        console.log(`=======${name}卦調試信息=======`);
        console.log(`爻值: [${lines.join(', ')}]`);
        console.log(`上卦: ${getTrigramSymbol(lines.slice(0, 3))}`);
        console.log(`下卦: ${getTrigramSymbol(lines.slice(3, 6))}`);
        console.log(`符號: ${symbol}`);
    }

    // Button event listeners
    // 全局變量保存當前的卦象信息
    let currentDivination = null;
    
    if (castButton) {
        castButton.addEventListener('click', () => {
            castButton.disabled = true;

            const { lines, changingLines, changedLines } = generateHexagram();
            const originalGua = getGuaData(lines);
            const changedGua = getGuaData(changedLines);
            
            // 保存當前占卜結果到全局變量
            currentDivination = {
                lines,
                changingLines,
                changedLines,
                originalGua,
                changedGua,
                movingPositions: changingLines.map(i => i+1).sort((a,b) => a-b)
            };

            if (originalGua && changedGua) {
                // 創建卦象的垂直線條 - 遵循左三爻為上卦，右三爻為下卦，上卦在上，下卦在下的規律
                let originalSymbol = '';
                let changedSymbol = '';
                
                // 爻顯示順序: 上卦（左三爻）在上方，下卦（右三爻）在下方
                // 處理順序從上到下：先處理左三爻(上卦)，再處理右三爻(下卦)
                
                // 先處理上卦（左三爻,索引0-2）放在上方
                for (let i = 0; i < 3; i++) {
                    const isMoving = changingLines.includes(i);
                    const lineClass = isMoving ? 'moving-line' : '';
                    
                    if (lines[i] === 1) { // 陽爻 (實線)
                        originalSymbol += `<div class="gua-line yang-line ${lineClass}"><div class="line-solid"></div></div>`;
                    } else { // 陰爻 (分開的線)
                        originalSymbol += `<div class="gua-line yin-line ${lineClass}"><div class="line-broken"></div></div>`;
                    }
                    
                    if (changedLines[i] === 1) { // 變卦陽爻
                        changedSymbol += `<div class="gua-line yang-line ${lineClass}"><div class="line-solid"></div></div>`;
                    } else { // 變卦陰爻
                        changedSymbol += `<div class="gua-line yin-line ${lineClass}"><div class="line-broken"></div></div>`;
                    }
                }
                
                // 再處理下卦（右三爻,索引3-5）放在下方
                for (let i = 3; i < 6; i++) {
                    const isMoving = changingLines.includes(i);
                    const lineClass = isMoving ? 'moving-line' : '';
                    
                    if (lines[i] === 1) { // 陽爻 (實線)
                        originalSymbol += `<div class="gua-line yang-line ${lineClass}"><div class="line-solid"></div></div>`;
                    } else { // 陰爻 (分開的線)
                        originalSymbol += `<div class="gua-line yin-line ${lineClass}"><div class="line-broken"></div></div>`;
                    }
                    
                    if (changedLines[i] === 1) { // 變卦陽爻
                        changedSymbol += `<div class="gua-line yang-line ${lineClass}"><div class="line-solid"></div></div>`;
                    } else { // 變卦陰爻
                        changedSymbol += `<div class="gua-line yin-line ${lineClass}"><div class="line-broken"></div></div>`;
                    }
                }

                // 分割卦辭和象徵
                const splitOriginal = originalGua.description.split('象徵');
                const originalGuaText = splitOriginal[0].trim();
                const originalSymbolText = splitOriginal.length > 1 ? splitOriginal[1].trim() : "";
                
                const splitChanged = changedGua.description.split('象徵');
                const changedGuaText = splitChanged[0].trim();
                const changedSymbolText = splitChanged.length > 1 ? splitChanged[1].trim() : "";
                
                // 生成動爻表格
                let linesTable = '';
                // 動爻位置從爻的下方(1)向上(6)計算
                const movingPositions = changingLines.map(i => i+1).sort((a,b) => a-b);
                
                // 記錄本次占卜相關的信息，便於調試
                console.log("本卦:", originalGua.name, "變卦:", changedGua.name);
                console.log("本卦符號:", originalGua.symbol, "變卦符號:", changedGua.symbol);
                console.log("六爻:", lines, "動爻位置:", changingLines, "變爻:", changedLines);
                
                // 使用調試函數顯示更多信息
                debugGua("本", lines, originalGua.symbol);
                debugGua("變", changedLines, changedGua.symbol);
                
                linesTable = `
                <div class="changing-lines">
                    <h3>動爻分析</h3>
                    <table class="lines-table">
                        <thead>
                            <tr>
                                <th>爻位</th>
                                <th>本卦</th>
                                <th>變卦</th>
                            </tr>
                        </thead>
                        <tbody>`;
                
                // 創建表格行，從下(第1爻)到上(第6爻)
                for (let i = 0; i < 6; i++) {
                    const isMoving = changingLines.includes(i);
                    const lineClass = isMoving ? 'class="moving-line"' : '';
                    
                    linesTable += `
                        <tr ${lineClass}>
                            <td>第${i+1}爻</td>
                            <td>${lines[i] === 1 ? '陽' : '陰'}</td>
                            <td>${changedLines[i] === 1 ? '陽' : '陰'}</td>
                        </tr>`;
                }
                
                linesTable += `
                        </tbody>
                    </table>
                    <p class="moving-lines-summary">動爻：第 ${movingPositions.join('、')} 爻</p>
                    <div class="ai-interpretation-actions">
                        <button id="ai-interpret-btn" class="btn btn-primary">AI解析此卦象</button>
                    </div>
                </div>`;
                
                resultContainer.innerHTML = `
                <div class="divination-result">
                    <div class="hexagram-pair">
                        <div class="hexagram-card">
                            <div class="hexagram-image">
                                <div class="gua-vertical">
                                    ${originalSymbol}
                                </div>
                            </div>
                            <h3 class="hexagram-title">本卦：${originalGua.name}</h3>
                            <div class="hexagram-text">
                                <p class="gua-verse">卦辭：${originalGuaText}</p>
                                <p class="gua-meaning">象徵：${originalSymbolText}</p>
                            </div>
                        </div>
                        
                        <div class="transformation-arrow">
                            <svg viewBox="0 0 24 24" width="36" height="36">
                                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" fill="currentColor" />
                            </svg>
                        </div>
                        
                        <div class="hexagram-card">
                            <div class="hexagram-image">
                                <div class="gua-vertical">
                                    ${changedSymbol}
                                </div>
                            </div>
                            <h3 class="hexagram-title">變卦：${changedGua.name}</h3>
                            <div class="hexagram-text">
                                <p class="gua-verse">卦辭：${changedGuaText}</p>
                                <p class="gua-meaning">象徵：${changedSymbolText}</p>
                            </div>
                        </div>
                    </div>
                    ${linesTable}
                    <div id="ai-interpretation" class="ai-interpretation"></div>
                </div>
                `;

                // 設置AI解析按鈕的點擊事件
                const aiInterpretBtn = document.getElementById('ai-interpret-btn');
                if (aiInterpretBtn) {
                    aiInterpretBtn.addEventListener('click', showAIInterpretation);
                }

                resultContainer.classList.add('active');
                resetButton.style.display = 'inline-block';
            } else {
                resultContainer.innerHTML = `<p>發生錯誤，請重新占卜。</p>`;
            }
            
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            castButton.disabled = false;
        });
    }
    
    // AI解析當前卦象
    function showAIInterpretation() {
        if (!currentDivination) {
            alert('請先進行占卜再使用AI解析');
            return;
        }
        
        const aiInterpretation = document.getElementById('ai-interpretation');
        if (!aiInterpretation) return;
        
        // 顯示載入指示器
        aiInterpretation.innerHTML = `
            <div class="ai-interpretation-loading">
                <div class="loading-spinner"></div>
                <p>AI正在解析卦象，請稍候...</p>
            </div>
        `;
        
        // 滾動到AI解析區域
        aiInterpretation.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // 使用AI占卜解釋
        setTimeout(() => {
            const { originalGua, changedGua, movingPositions } = currentDivination;
            
            // 模擬AI生成的解釋文字
            const interpretation = `
                <div class="ai-interpretation-content">
                    <h3>AI卦象解析</h3>
                    <p>您所卜得的是「${originalGua.name}」卦變「${changedGua.name}」卦，動爻在第 ${movingPositions.join('、')} 爻。</p>
                    
                    <h4>綜合寓意</h4>
                    <p>${getRandomInterpretation(originalGua.name, changedGua.name)}</p>
                    
                    <h4>人生指引</h4>
                    <p>${getRandomAdvice()}</p>
                    
                    <h4>提示與建議</h4>
                    <p>${getRandomTip()}</p>
                    
                    <div class="ai-chat-prompt">
                        <p>想了解更多詳細解析或提問？</p>
                        <button id="open-ai-chat" class="btn btn-secondary">開啟AI對話</button>
                    </div>
                </div>
            `;
            
            aiInterpretation.innerHTML = interpretation;
            
            // 設置對話按鈕點擊事件
            const openAIChatBtn = document.getElementById('open-ai-chat');
            if (openAIChatBtn) {
                openAIChatBtn.addEventListener('click', () => {
                    // 打開易智大師 AI 連結
                    window.open('https://gptbots.ai/s/csM8pJE7', '_blank');
                });
            }
        }, 2000); // 模擬加載時間
    }
    
    // AI解釋生成函數 - 隨機選擇解釋文本
    function getRandomInterpretation(originalName, changedName) {
        const interpretations = [
            `此卦從「${originalName}」變「${changedName}」，表示您當前經歷著從困境到光明的轉變過程。您正處在一個轉折點，需要保持耐心和堅定的信念，目前的挑戰將會帶來成長和機遇。`,
            `「${originalName}」卦變「${changedName}」卦顯示，您正在經歷一個重要的人生階段。這個變化暗示著改變正在發生，雖然可能帶來一些不確定性，但最終將引領您走向更好的境地。`,
            `卦象「${originalName}」轉「${changedName}」意味著您當前的情況需要審慎處理。這個轉變表明您需要更多的智慧和冷靜來面對挑戰，同時也暗示著新的機遇正在形成。`,
            `從「${originalName}」卦到「${changedName}」卦的變化，象徵著內在與外在世界的調和過程。您可能需要平衡自己的理想與現實，同時保持開放心態接納變化帶來的可能性。`,
            `此卦象顯示，「${originalName}」到「${changedName}」的變化過程提醒您需要靈活應對。生活中的變數可能帶來挑戰，但也為您提供了重新思考和調整方向的機會。`
        ];
        return interpretations[Math.floor(Math.random() * interpretations.length)];
    }
    
    function getRandomAdvice() {
        const advices = [
            "現階段您應當保持謙遜的態度，多聆聽他人的建議，同時堅持自己的原則。積極面對挑戰，但避免過於急躁，循序漸進地實現目標。",
            "這個時期適合反思和自我提升。建議您暫時放下一些外界的干擾，專注於內心的成長。您的努力將在未來得到回報，耐心是現階段的關鍵。",
            "卦象顯示您需要更多的勇氣去面對未知。大膽嘗試新事物，同時保持謹慎，可以為您打開新的機會之門。相信自己的直覺，但也要做好詳細的計劃。",
            "當前形勢下，與他人的合作將帶來意想不到的收獲。開放心態、真誠溝通，將幫助您建立有價值的人際關係。同時也要保持獨立思考的能力。",
            "這段時間適合整理思緒，重新評估您的目標和方向。不急於做出重大決定，給自己足夠的時間思考。靈活調整計劃，順應生活的自然流動。"
        ];
        return advices[Math.floor(Math.random() * advices.length)];
    }
    
    function getRandomTip() {
        const tips = [
            "在接下來的一個月內，特別關注您的健康和心理平衡。適當的休息、均衡的飲食和規律的運動將幫助您保持最佳狀態，面對挑戰時更加從容。",
            "近期可能會有一個意想不到的機會出現，建議您保持敏銳的觀察力。關注細節，不要錯過隱藏在日常生活中的契機。積極準備，隨時把握機遇。",
            "人際關係方面可能會有一些變動，不要過於擔心。真正重要的關係會經受住時間的考驗。保持真誠，適時表達感謝，這將增強您與他人的連結。",
            "近期宜靜不宜動，專注於已經開始的項目，避免同時開展太多事情。深入而非廣泛地發展自己的才能和項目，將獲得更實質性的進展。",
            "財務方面建議保持謹慎和節制。這段時間適合儲蓄和規劃長期投資，而不是衝動消費。理性評估風險，做出明智的財務決策，為未來打下堅實基礎。"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (resultContainer) {
                resultContainer.innerHTML = '';
                resultContainer.classList.remove('active');
            }
        });
    }
    
    if (aboutButton) {
        aboutButton.addEventListener('click', () => {
            const modal = document.getElementById('about-modal');
            if (modal) {
                modal.classList.add('show');
                
                // Close modal when clicking outside or on close button
                const closeBtn = modal.querySelector('.close-btn');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        modal.classList.remove('show');
                    });
                }
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('show');
                    }
                });
            }
        });
    }
    
    // AI解說按鈕功能
    const aiButton = document.getElementById('ai-button');
    if (aiButton) {
        aiButton.addEventListener('click', () => {
            // 創建一個模態框來顯示iframe
            const modal = document.createElement('div');
            modal.className = 'modal show';
            modal.id = 'ai-modal';
            modal.innerHTML = `
                <div class="modal-content ai-modal-content">
                    <button class="close-btn">&times;</button>
                    <h2>易智大師占卜解說</h2>
                    <div class="iframe-container">
                        <iframe width="100%" height="100%" allow="microphone *" src="https://www.gptbots.ai/widget/eeavspiekwtrdohhv0wh33d/chat.html"></iframe>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // 關閉模態框功能
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                });
            }
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    }
    
    // AI氣泡按鈕功能
    const aiBubble = document.getElementById('ai-bubble');
    if (aiBubble) {
        aiBubble.addEventListener('click', () => {
            // 打開易智大師 AI 連結
            window.open('https://gptbots.ai/s/csM8pJE7', '_blank');
        });
    }

    // Initialize floating hexagrams in the background
    createBackgroundHexagrams();
    
    function createBackgroundHexagrams() {
        const bgContainer = document.querySelector('.background-hexagrams');
        if (!bgContainer) return;
        
        const hexSymbols = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
        const numHexagrams = 20;
        
        for (let i = 0; i < numHexagrams; i++) {
            const hex = document.createElement('div');
            hex.className = 'bg-hexagram';
            hex.textContent = hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
            
            // Random positioning and animation
            hex.style.left = `${Math.random() * 100}%`;
            hex.style.top = `${Math.random() * 100}%`;
            hex.style.animationDuration = `${15 + Math.random() * 30}s`;
            hex.style.animationDelay = `${Math.random() * 10}s`;
            hex.style.fontSize = `${Math.random() * 60 + 20}px`;
            hex.style.opacity = Math.random() * 0.2 + 0.05;
            
            bgContainer.appendChild(hex);
        }
    }
});

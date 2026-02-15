// ================= Configuration =================
const PHASE_CONFIG = [
    { 
        id: 1, name: "进组期", 
        kpis: [ { type: 'sugar', target: 60, label: '糖分' } ], // 修改：目标从100→80
        desc: "“此时你们还不知道，命运馈赠的礼物早已标好了价格。”" 
    },
    { 
        id: 2, name: "热播期", 
        kpis: [ { type: 'sugar', target: 220, label: '糖分' }, { type: 'money', target: 400, label: '资本' } ], // 修改：糖分350→280，资本500→400
        desc: "“全世界都在嗑生嗑死，只有你们在后台互翻白眼。”" 
    },
    { 
        id: 3, name: "风波期", 
        kpis: [ { type: 'solo', target: 120, label: '唯粉' }, { type: 'risk', target: 48, label: '风险控制', isMax: true } ], // 修改：唯粉200→180，风险上限50→60
        desc: "“唯粉正在磨刀霍霍，由于你的每一条微博。”" 
    },
    { id: 4, name: "终局抉择", kpis: [], desc: "“是时候做出选择了，为了红，还是为了人？”" }
];

const GOSSIP_LIB = [
    // 原有内容保留
    "营销号：#XX好假# 这种糖也有人嗑？进厂拧螺丝去吧！",
    "路人：这剧还能看吗？全是工业糖精，yue了。",
    "唯粉：抱走哥哥不约，吸血鬼滚远点！",
    "站姐：今天出的图修都不用修，原图直出！kswl！",
    "资方：只要数据好看，是不是真的重要吗？",
    "黑粉：坐等塌房，手里有大瓜，周三见。",
    "热搜：#XX眼神拉丝# 又是为绝美爱情流泪的一天！",
    
    // 新增真实饭圈话术
    "CP粉：扒了三天三夜的同款，这颗糖是硬糖！锤死了！",
    "唯粉：别来沾边！哥哥独美！CP粉能不能要点脸？",
    "营销号：知情人士爆料，XX二人私下根本不说话，营业罢了。",
    "路人：刚刷到他俩同框视频，怎么感觉氛围怪怪的，像有仇？",
    "站姐：今天追线下被私生怼了，心累，暂时停更一周。",
    "黑粉：刚扒到XX去年的黑料，P图实锤，等着被锤吧！",
    "工作室：关于网传XX不实信息，我方已取证，将依法维权。",
    "资方：这周数据没达标，下周的热搜预算砍一半。",
    "CP粉：超话等级8级了，结果正主解绑，我的青春喂了狗！",
    "唯粉：集资冲了50万销量，哥哥的商务必须守住！",
    "营销号：#XX避嫌# 同台全程零交流，解绑锤了？",
    "路人：内娱的CP都是流水线，嗑一个塌一个，累了。",
    "站姐：原图被代拍倒卖了，以后只发精修，不发生图了。",
    "黑粉：XX的粉丝又来控评了，路人缘败光了都！",
    "热搜：#XX工作室辟谣# 评论区全是粉丝洗地，路人看笑了。",
    "资方：只要能带货，炒CP这点争议算什么？",
    "CP粉：他俩的同款戒指是定制款，品牌方都没发售，懂的都懂！",
    "唯粉：哥哥的新剧官宣了，别再带XX捆绑了，谢谢！",
    "营销号：XX的商务被对家截胡了，粉丝还在自我安慰。",
    "路人：刚刷到粉丝互撕的帖子，点进去看了半小时，比剧还精彩。",
    "工作室：XX近期专注拍戏，暂无综艺和商务安排，请勿造谣。",
    "黑粉：坐等周三，XX的料够让他凉透了，不信等着瞧！",
    "热搜：#XX生图状态# 离开了精修，颜值崩得一塌糊涂。"
];

// ================= Event Database (Expanded + 数值调整) =================
// ================= Event Database (整合对家/粉丝/前辈事件 + 第四阶段扩容) =================
const RAW_EVENTS = {
    1: [
        // 原有进组期事件（保留）
        { t: "开机仪式，导演递给你们同一把剪刀剪彩。", i: "✂️", o: [
            { t: "手握着手一起剪", e: { sugar: 35, risk: 4 } },
            { t: "谦让，让他先剪", e: { solo: 10, bond: 5 } },
            { t: "甚至故意剪歪抢镜", e: { money: -40, risk: 8, bond: -8 } }
        ]},
        { t: "刚进组，经纪人让你签个“对赌协议”。", i: "📝", o: [
            { t: "签！为了红拼了", e: { money: 180, risk: 8, bond: -8 } },
            { t: "不签，求稳", e: { money: -40, solo: 10 } },
            { t: "甚至把协议发给搭档看", e: { bond: 25, sugar: 18, money: -15 } }
        ]},
        { t: "剧组盒饭太难吃，搭档在抱怨。", i: "🍱", o: [
            { t: "把自己鸡腿给他", e: { bond: 18, sugar: 25 } },
            { t: "发微博吐槽剧组穷", e: { risk: 18, solo: 25 } },
            { t: "自费请全剧组吃好的", e: { money: -80, bond: 8, solo: 8 } }
        ]},
        { t: "第一场吻戏，导演问要不要借位。", i: "💋", o: [
            { t: "甚至要求真亲", e: { sugar: 50, bond: 8, risk: 12 } },
            { t: "借位，那是另外的价钱", e: { money: 40, sugar: -8 } },
            { t: "笑场了十次", e: { bond: 18, sugar: 8 } }
        ]},
        { t: "微商品牌找你推广“瘦身茶”。", i: "🍵", o: [
            { t: "接！给的实在太多了", e: { money: 250, risk: 18, solo: -25 } },
            { t: "拒绝，太Low了", e: { solo: 18, money: 0 } },
            { t: "拉着搭档一起接", e: { money: 120, sugar: 18, risk: 25 } }
        ]},
        { t: "剧本围读，搭档把你的台词记错了好几句。", i: "📖", o: [
            { t: "笑着提醒，帮他圆场", e: { bond: 20, sugar: 12, risk: -4 } },
            { t: "当场指出来，让他下不来台", e: { solo: 18, bond: -12, risk: 8 } },
            { t: "假装没听见，继续读自己的", e: { risk: 4, sugar: -4 } }
        ]},
        { t: "代拍蹲在剧组门口拍你们下班，挤到了路人。", i: "📸", o: [
            { t: "出声制止代拍，保护路人", e: { solo: 35, risk: 4, money: 0 } },
            { t: "加快脚步上车，假装没看见", e: { sugar: 8, risk: 12 } },
            { t: "让助理给代拍发红包，让他删照片", e: { money: -70, risk: -8, sugar: 4 } }
        ]},
        { t: "定妆照出来，你的造型被搭档压了一头。", i: "💄", o: [
            { t: "让造型师连夜改妆，加预算", e: { money: -120, solo: 25, risk: 8 } },
            { t: "无所谓，营业感拉满合照", e: { sugar: 35, bond: 8 } },
            { t: "发微博内涵造型团队", e: { risk: 20, solo: 18, bond: -4 } }
        ]},
        // 新增：进组期-粉丝/前辈/轻度对家事件
        { t: "前辈演员来探班，私下提醒你“少麦麸，多磨演技”。", i: "🎭", o: [
            { t: "虚心接受，请教演技", e: { solo: 20, risk: -5, bond: 0 } },
            { t: "嘴上答应，转头继续营业", e: { sugar: 15, risk: 5, solo: -8 } },
            { t: "反问前辈“现在观众就吃这套”", e: { risk: 10, solo: -10, money: 0 } }
        ]},
        { t: "少量粉丝来剧组应援，只给你送了礼物，忽略搭档。", i: "🎁", o: [
            { t: "把礼物分一半给搭档", e: { bond: 15, sugar: 10, solo: -8 } },
            { t: "收下不吭声，发微博感谢粉丝", e: { solo: 20, bond: -5, sugar: -5 } },
            { t: "让粉丝也给搭档准备一份", e: { sugar: 18, solo: -5, risk: 0 } }
        ]},
        { t: "对家团队偷偷买水军，说你“资源咖，没演技”。", i: "💣", o: [
            { t: "让经纪人澄清，晒试镜视频", e: { solo: 15, risk: 5, money: -50 } },
            { t: "不理会，专注拍戏", e: { risk: -3, solo: 5, sugar: 0 } },
            { t: "反买水军夸自己，压过对家", e: { money: -80, risk: 10, solo: 10 } }
        ]},
    ],
    2: [
        // 原有热播期事件（保留）
        { t: "双人杂志拍摄，摄影师要求鼻尖碰鼻尖。", i: "📸", o: [
            { t: "甚至真的亲到了", e: { sugar: 85, bond: 18, risk: 25, solo: -40 } },
            { t: "全是技巧的借位", e: { sugar: 35, risk: 0 } },
            { t: "笑场躲开", e: { sugar: -8, solo: 18 } }
        ]},
        { t: "土味网剧想蹭热度，出高价请你们客串。", i: "🤡", o: [
            { t: "去！恰烂钱不寒碜", e: { money: 350, risk: 12, sugar: -18 } },
            { t: "不去，爱惜羽毛", e: { solo: 25, money: 0 } },
            { t: "只要我一个人去", e: { money: 180, bond: -18, solo: 18 } }
        ]},
        { t: "高奢品牌想签双人代言，费用可观。", i: "👜", o: [
            { t: "立刻签约！抢钱！", e: { money: 450, sugar: 45, risk: 8 } },
            { t: "只要单人Title", e: { money: 180, solo: 45, bond: -25, sugar: -40 } },
            { t: "推掉，怕被捆绑", e: { money: 0, solo: 25, sugar: -18 } }
        ]},
        { t: "综艺节目玩游戏，需要背着对方跑。", i: "🏃", o: [
            { t: "甚至不仅背还颠两下", e: { sugar: 50, bond: 8 } },
            { t: "嫌弃他太重", e: { sugar: 18, bond: 18, solo: 8 } },
            { t: "假装受伤拒绝", e: { solo: 25, risk: -4 } }
        ]},
        { t: "直播带货时，搭档口误念错品牌名。", i: "🎙️", o: [
            { t: "立刻接话圆场，救场满分", e: { bond: 25, sugar: 20, risk: -8 } },
            { t: "偷笑，被镜头拍到", e: { sugar: 35, risk: 12, solo: -8 } },
            { t: "假装没听见，继续念自己的脚本", e: { risk: 18, bond: -18, money: -80 } }
        ]},
        { t: "品牌方要求你们“扫楼”，互动环节被要求喂对方吃零食。", i: "🍬", o: [
            { t: "主动喂，还擦对方嘴角的渣", e: { sugar: 70, solo: -25, risk: 8 } },
            { t: "只递过去，不肢体接触", e: { sugar: 18, solo: 18 } },
            { t: "拒绝配合，说“保持边界感”", e: { money: -180, solo: 35, risk: 4 } }
        ]},
        { t: "你的商务资源被搭档的团队抢了（同品类）。", i: "💰", o: [
            { t: "让经纪人撕资源，公开内涵", e: { risk: 25, solo: 45, bond: -35 } },
            { t: "私下找搭档聊，表面和气", e: { bond: 8, money: -40, sugar: 8 } },
            { t: "转头签更高奢的竞品品牌", e: { money: 400, risk: 12, solo: 25 } }
        ]},
        { t: "CP粉扒出你们戴了同款项链，冲上热搜第一。", i: "🔗", o: [
            { t: "发微博澄清是品牌赞助款", e: { sugar: -40, solo: 35, risk: -4 } },
            { t: "不回应，让粉丝自己猜", e: { sugar: 60, risk: 18 } },
            { t: "故意戴另一款不同的项链打脸", e: { solo: 20, sugar: -25, bond: -12 } }
        ]},
        // 新增：热播期-对家/粉丝/前辈事件（热度高峰，冲突升级）
        { t: "对家抢了你原本的热搜位，把你“红毯造型”压到热搜20名外。", i: "📈", o: [
            { t: "砸钱买热搜反击，压过对家", e: { money: -200, risk: 15, solo: 10 } },
            { t: "用CP糖炒热度，反超对家", e: { sugar: 40, bond: 10, risk: 10 } },
            { t: "认栽，专注下一个商务", e: { money: 50, risk: -5, solo: 5 } }
        ]},
        { t: "大粉组织线下应援，CP粉和唯粉在现场吵起来。", i: "⚛️", o: [
            { t: "出面劝和，说“都是我的粉丝”", e: { sugar: 20, solo: -10, risk: -5 } },
            { t: "只安抚唯粉，无视CP粉", e: { solo: 30, sugar: -20, risk: 5 } },
            { t: "躲起来不露面，让工作室处理", e: { risk: 10, sugar: -5, solo: -5 } }
        ]},
        { t: "前辈邀你一起上央视正剧，要求你减少CP营业。", i: "📺", o: [
            { t: "答应，暂停CP营业", e: { solo: 25, sugar: -30, risk: -10 } },
            { t: "拒绝，CP热度正高", e: { sugar: 20, risk: 8, solo: -10 } },
            { t: "协商：边营业边拍正剧", e: { sugar: 10, solo: 10, risk: 5 } }
        ]},
    ],
    3: [
        // 原有风波期事件（保留）
        { t: "对家发通稿黑你“吸血”，数据难看。", i: "📉", o: [
            { t: "花钱撤热搜", e: { money: -250, risk: -18 } },
            { t: "甚至发糖回击", e: { sugar: 50, bond: 8, solo: -18 } },
            { t: "顺势卖惨虐粉", e: { solo: 70, sugar: -25, bond: -8 } }
        ]},
        { t: "资方想让你们解绑，给了一笔“封口费”。", i: "🤐", o: [
            { t: "拿钱，开始冷暴力", e: { money: 350, bond: -45, sugar: -45 } },
            { t: "不拿，我们是真爱", e: { bond: 45, money: -80, risk: 18 } },
            { t: "拿钱，但继续偷偷联系", e: { money: 350, bond: 18, risk: 45 } }
        ]},
        { t: "被狗仔拍到你和素人吃饭。", i: "🥘", o: [
            { t: "甚至说是他妹妹", e: { money: -80, risk: -18 } },
            { t: "拉他也下水：剧组聚餐", e: { sugar: 35, bond: -18, risk: 8 } },
            { t: "沉默不回应", e: { risk: 45, solo: -45 } }
        ]},
        { t: "唯粉在评论区大战，要求工作室维权。", i: "⚔️", o: [
            { t: "发律师函告黑粉", e: { solo: 55, money: -80 } },
            { t: "安抚CP粉", e: { sugar: 35, solo: -35 } },
            { t: "装死", e: { risk: 8, bond: -8 } }
        ]},
        { t: "大粉（站姐）脱粉回踩，放出你私下黑脸的生图。", i: "📸", o: [
            { t: "花钱买走生图，压下去", e: { money: -350, risk: -20, solo: -8 } },
            { t: "发长文卖惨，说“艺人也是人”", e: { solo: 45, risk: 8, sugar: -12 } },
            { t: "怼站姐：“拿我钱还背刺？”", e: { risk: 35, solo: 18, bond: 0 } }
        ]},
        { t: "税务部门查账，经纪人让你签“阴阳合同”避税。", i: "💸", o: [
            { t: "签！能省一大笔", e: { money: 500, risk: 50, solo: 0 } },
            { t: "拒绝，补全税款", e: { money: -250, risk: -12, solo: 25 } },
            { t: "让搭档也签，互相绑定", e: { bond: -25, money: 250, risk: 40 } }
        ]},
        { t: "CP粉线下应援和唯粉打起来了，上了社会新闻。", i: "⚛️", o: [
            { t: "发微博劝和，说“都是一家人”", e: { sugar: 25, solo: -35, risk: -4 } },
            { t: "只安抚唯粉，忽略CP粉", e: { solo: 60, sugar: -50, risk: 8 } },
            { t: "让工作室甩锅给“私生饭”", e: { risk: -5, sugar: -8, money: -120 } }
        ]},
        { t: "平台要求你们参加“顶流之夜”，但座位被分开安排。", i: "🎪", o: [
            { t: "主动坐到他旁边，无视安排", e: { sugar: 80, risk: 25, solo: -45 } },
            { t: "乖乖坐自己位置，全程无互动", e: { solo: 35, sugar: -35, risk: -4 } },
            { t: "借口身体不舒服，缺席晚会", e: { money: -180, risk: 12, bond: -8 } }
        ]},
        // 新增：风波期-对家/粉丝/前辈事件（矛盾爆发）
        { t: "对家放出你和搭档的“不和证据”（断章取义的录音）。", i: "🎙️", o: [
            { t: "放出完整录音澄清", e: { sugar: 25, risk: -10, money: -100 } },
            { t: "反锤对家“录音造假”", e: { solo: 30, risk: 15, money: -150 } },
            { t: "装死，等热度过去", e: { risk: 20, sugar: -15, solo: -5 } }
        ]},
        { t: "核心粉丝脱粉，带走大量粉丝数据，粉丝群濒临解散。", i: "👥", o: [
            { t: "亲自下场挽留，发手写小作文", e: { solo: 20, risk: -5, money: -50 } },
            { t: "不管不顾，让新粉头接手", e: { risk: 10, solo: -10, sugar: 0 } },
            { t: "用CP糖固粉，转移注意力", e: { sugar: 30, solo: -15, risk: 5 } }
        ]},
        { t: "前辈出面调解你和对家的矛盾，让你“退一步”。", i: "🤝", o: [
            { t: "听前辈的，和解", e: { risk: -10, solo: -5, money: 0 } },
            { t: "表面答应，私下继续刚", e: { risk: 10, solo: 5, money: -50 } },
            { t: "拒绝调解，说“凭什么我让”", e: { risk: 15, solo: 10, money: 0 } }
        ]},
    ],
    4: [
        // 原有终局抉择事件（保留）
        { t: "告别演唱会彩排，选最后一首歌。", i: "🎤", o: [
            { t: "选《私奔》", e: { bond: 18, sugar: 45, risk: 8 } },
            { t: "选《体面》", e: { solo: 25, bond: -18 } },
            { t: "选《好汉歌》", e: { risk: 18, sugar: -18 } }
        ]},
        { t: "经纪人拿来新的续约合同。", i: "📝", o: [
            { t: "看都不看直接扔", e: { money: -80, solo: 18 } },
            { t: "要求必须双人打包签", e: { sugar: 45, bond: 8 } },
            { t: "偷偷只签自己", e: { money: 450, bond: -90, solo: 45 } }
        ]},
        { t: "最后一次红毯，记者问未来的关系。", i: "🎤", o: [
            { t: "“我们永远是朋友”", e: { bond: 8 } },
            { t: "“同事而已”", e: { bond: -18, solo: 18 } },
            { t: "沉默并红了眼眶", e: { sugar: 70, risk: 8 } }
        ]},
        { t: "【终局抉择】所有聚光灯都打在你们身上。", i: "🏆", o: [
            { t: "官宣解绑，各自美丽", e: { end: 'solo' } },
            { t: "甚至续约，继续捆绑", e: { end: 'bind' } },
            { t: "甚至直接退圈", e: { end: 'quit' } }
        ]},
        { t: "粉丝见面会，被问到“如果重来一次还会合作吗？”", i: "🎙️", o: [
            { t: "“当然，他是最好的搭档”", e: { bond: 35, sugar: 55, risk: 4 } },
            { t: "“看缘分吧”", e: { sugar: 18, solo: 12, bond: 4 } },
            { t: "“我更想尝试不同的合作方”", e: { solo: 40, bond: -25, sugar: -20 } }
        ]},
        { t: "顶奢品牌找你签单人代言，但要求你和搭档彻底解绑。", i: "💎", o: [
            { t: "签约，公开解绑", e: { money: 700, solo: 65, bond: -70, sugar: -90 } },
            { t: "拒绝，保留CP可能性", e: { money: 0, sugar: 35, bond: 25, risk: 8 } },
            { t: "要求品牌也签搭档，双人代言", e: { money: 450, sugar: 80, solo: -35, risk: 12 } }
        ]},
        { t: "最后一次直播，弹幕全在刷“锁死”，搭档看向你。", i: "📱", o: [
            { t: "笑着比心，回应弹幕", e: { sugar: 90, risk: 20, bond: 25 } },
            { t: "假装没看见，喝水转移话题", e: { solo: 25, sugar: -18, bond: -4 } },
            { t: "说“大家别磕了，只是同事”", e: { solo: 55, sugar: -70, risk: -8 } }
        ]},
        // 新增：终局抉择期-对家/粉丝/前辈事件（收尾+更多终局选择）
        { t: "对家最后一搏，抢了你压轴颁奖礼的领奖资格。", i: "🏆", o: [
            { t: "当场甩脸走人，不上台", e: { risk: 25, solo: 30, money: -100 } },
            { t: "笑着恭喜对家，体面收场", e: { risk: -5, solo: 10, money: 50 } },
            { t: "让搭档帮你说话，暗踩对家", e: { bond: 15, sugar: 10, risk: 15 } }
        ]},
        { t: "粉丝众筹给你送了“退役礼物”，希望你“做自己”。", i: "🎁", o: [
            { t: "收下并公开感谢，承诺“不辜负”", e: { solo: 30, sugar: 10, risk: -5 } },
            { t: "拒收，说“不用破费”", e: { solo: -10, risk: -3, money: 0 } },
            { t: "和搭档一起收下，说“谢谢大家的爱”", e: { sugar: 40, bond: 20, solo: -15 } }
        ]},
        { t: "前辈找你谈话，劝你“要么彻底解绑，要么真在一起”。", i: "💬", o: [
            { t: "听前辈的，官宣解绑", e: { end: 'solo', solo: 20, risk: -10 } },
            { t: "听前辈的，退圈在一起", e: { end: 'quit', bond: 50, sugar: 50 } },
            { t: "敷衍过去，继续模糊处理", e: { risk: 15, sugar: 10, bond: 10 } }
        ]},
        { t: "最后一次合体采访，被问到“有没有动过真心”。", i: "🎙️", o: [
            { t: "“只是营业，别当真”", e: { solo: 40, bond: -30, sugar: -40 } },
            { t: "眼神躲闪，不回答", e: { sugar: 20, risk: 10, bond: 15 } },
            { t: "“爱过，现在也是”（公开认爱）", e: { bond: 80, sugar: 100, risk: 50 } }
        ]},
        { t: "资方最后施压：要么续约捆绑2年，要么赔偿巨额违约金。", i: "💸", o: [
            { t: "续约，继续麦麸营业", e: { end: 'bind', money: 1000, risk: 30, bond: -20 } },
            { t: "赔钱解约，彻底自由", e: { money: -800, solo: 50, risk: -20 } },
            { t: "拉搭档一起赔钱，共进退", e: { bond: 60, money: -400, risk: 10 } }
        ]}
    ]
};

// ================= Game Logic =================
const state = {
    attrs: { beauty: 0, acting: 0, cash: 0 },
    pointsLeft: 12, // 初始点数保持12，足够分配出1-2个高天赋（8+）
    stats: { sugar: 0, solo: 0, money: 0, bond: 0, risk: 0 },
    phase: 1,
    week: 1,
    usedEvents: new Set(),
    buffs: []
};

// Attribute Logic
// ================= 属性调整逻辑 (适配滑块) =================

// 处理滑块拖动
function onSliderChange(activeKey) {
    const keys = ['beauty', 'acting', 'cash'];
    const maxPoints = 12; // 总点数限制

    // 1. 计算其他滑块已占用的点数
    let usedByOthers = 0;
    keys.forEach(k => {
        if (k !== activeKey) {
            usedByOthers += parseInt(state.attrs[k]);
        }
    });

    // 2. 获取当前滑块试图设置的值
    const inputEl = document.getElementById(`input-${activeKey}`);
    let newValue = parseInt(inputEl.value);

    // 3. 计算允许的最大值 (总点数 - 其他已用，且单项不超过10)
    let maxAllowed = maxPoints - usedByOthers;
    if (maxAllowed > 10) maxAllowed = 10;

    // 4. 限制数值：如果超过上限，强制弹回
    if (newValue > maxAllowed) {
        newValue = maxAllowed;
        inputEl.value = newValue; // 视觉回弹
    }

    // 5. 更新状态
    state.attrs[activeKey] = newValue;
    
    // 6. 更新剩余点数
    state.pointsLeft = maxPoints - (usedByOthers + newValue);
    document.getElementById('points-left').innerText = state.pointsLeft;

    // 7. 更新当前滑块的文字描述
    updateSliderUI(activeKey, newValue);
}

// 更新单个滑块的文字和颜色
function updateSliderUI(key, val) {
    document.getElementById(`val-${key}`).innerText = val;
    const desc = document.getElementById(`desc-${key}`);
    
    let text = "";
    let colorClass = "text-slate-500";

    if (key === 'beauty') {
        if (val <= 3) { text = "路人脸"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "小有姿色"; colorClass = "text-pink-400"; }
        else { text = "神颜降世"; colorClass = "text-pink-300 font-bold"; }
    } else if (key === 'acting') {
        if (val <= 3) { text = "面瘫AI"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "及格水平"; colorClass = "text-purple-400"; }
        else { text = "老戏骨"; colorClass = "text-purple-300 font-bold"; }
    } else if (key === 'cash') {
        if (val <= 3) { text = "贫困潦倒"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "小康家庭"; colorClass = "text-yellow-400"; }
        else { text = "家里有矿"; colorClass = "text-yellow-300 font-bold"; }
    }

    desc.innerText = text;
    desc.className = `text-[10px] text-right h-4 transition-colors ${colorClass}`;
}

// 初始化滑块状态
function initSliders() {
    ['beauty', 'acting', 'cash'].forEach(k => {
        document.getElementById(`input-${k}`).value = state.attrs[k];
        updateSliderUI(k, state.attrs[k]);
    });
    document.getElementById('points-left').innerText = state.pointsLeft;
}

// Start Game
function startGame() {
    if (window._hmt) window._hmt.push(['_trackEvent', 'Game_Maifu', 'Click_Start', '开始麦麸']);
    state.buffs = [];
    
    // Buffs（修改：降低极端buff的影响，更均衡）
    if (state.attrs.beauty >= 8) state.buffs.push({name:'✨ 绝世神颜 (糖分×1.4)'}); // 原1.5→1.4
    else if (state.attrs.beauty <= 3) state.buffs.push({name:'🗿 普男 (糖分×0.8)'}); // 原0.7→0.8
    
    if (state.attrs.acting >= 8) state.buffs.push({name:'🎭 影帝附体 (风险×0.6)'}); // 原0.5→0.6
    else if (state.attrs.acting <= 3) state.buffs.push({name:'🤖 瞪眼演技 (风险+3)'}); // 原+5→+3
    
    if (state.attrs.cash >= 8) state.buffs.push({name:'💰 资本宠儿 (初始资金+300)'}); // 原+500→+300
    else if (state.attrs.cash <= 3) state.buffs.push({name:'💸 穷籍 (开局无钱)'});

    // Initial Stats（修改：初始数值更温和）
    state.stats.sugar = state.attrs.beauty * 12; // 原×15→×12
    state.stats.money = state.attrs.cash * 80; // 原×100→×80
    if(state.attrs.cash >= 8) state.stats.money += 300; // 原+500→+300
    state.stats.bond = 20;
    state.stats.risk = 0;

    document.getElementById('screen-char').classList.add('hidden');
    const gameScreen = document.getElementById('screen-game');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('flex');
    
    updateUI();
    loadEvent();
}

// Load Event
function loadEvent() {
    // Phase 4 specific logic
    if (state.phase === 4) {
        const phase4Count = [...state.usedEvents].filter(k => k.startsWith('4-')).length;
        if (phase4Count >=3) {
            renderEvent(RAW_EVENTS[4][3]); 
            return;
        }
    }

    const pool = RAW_EVENTS[state.phase];
    let available = pool.filter((ev, idx) => {
        const key = `${state.phase}-${idx}`;
        if (state.phase === 4 && idx === 3) return false; 
        return !state.usedEvents.has(key);
    });

    if (available.length === 0) {
        if (state.phase === 4) { renderEvent(RAW_EVENTS[4][3]); return; }
        available = pool; 
        [...state.usedEvents].forEach(k => { if(k.startsWith(state.phase+'-')) state.usedEvents.delete(k); });
    }

    const ev = available[Math.floor(Math.random() * available.length)];
    const originalIdx = pool.indexOf(ev);
    state.usedEvents.add(`${state.phase}-${originalIdx}`);
    
    renderEvent(ev);
    refreshGossip();
}

function refreshGossip() {
    const txt = GOSSIP_LIB[Math.floor(Math.random() * GOSSIP_LIB.length)];
    const el = document.getElementById('gossip-text');
    el.style.animation = 'none';
    el.offsetHeight; // 触发重绘
    el.style.animation = 'scroll 15s linear infinite';
    el.innerText = txt;
}

function renderEvent(ev) {
    document.getElementById('event-text').innerText = ev.t;
    document.getElementById('event-icon').innerText = ev.i;
    ev.o.forEach((opt, i) => {
        const btn = document.getElementById(`btn-opt${i+1}`);
        btn.innerText = opt.t;
        btn.onclick = () => handleChoice(opt.e);
    });
}

// Handle Choice
// Handle Choice (已修复周数更新滞后问题)
// Handle Choice (麦麸版：每阶段 6 周)
function handleChoice(eff) {
    if (eff.end) { calcEnding(eff.end); return; }

    let dSugar = eff.sugar || 0;
    let dRisk = eff.risk || 0;
    let dMoney = eff.money || 0;

    // Buff Logic
    if (state.attrs.beauty >= 8 && dSugar > 0) dSugar = Math.floor(dSugar * 1.4); 
    if (state.attrs.beauty <= 3 && dSugar > 0) dSugar = Math.floor(dSugar * 0.8);
    
    if (state.attrs.acting >= 8 && dRisk > 0) dRisk = Math.floor(dRisk * 0.6); 
    if (state.attrs.acting <= 3 && dRisk > 0) dRisk += 3;

    state.stats.sugar += dSugar;
    state.stats.solo += eff.solo || 0;
    state.stats.bond += eff.bond || 0;
    state.stats.money += dMoney;
    state.stats.risk += dRisk;

    if (state.stats.risk < 0) state.stats.risk = 0;

    // ==========================================
    // 🔴 关键修改：先加周数，再更新UI 🔴
    // ==========================================
    state.week++; 

    showToast({ sugar: dSugar, solo: eff.solo, money: dMoney, bond: eff.bond, risk: dRisk });
    updateUI();

    if (state.stats.risk >= 100) {
        state.stats.risk = 100;
        document.getElementById('game-risk').innerText = "100%";
        setTimeout(() => {
            showReport(false, "🔴 塌房指数爆表 (100%)\n\n全网黑料满天飞，品牌方排队解约。\n你的内娱生涯到此结束。");
        }, 500);
        return;
    }

    // ==========================================
    // 🔴 关键修改：麦麸版是 6 周 🔴
    // 当 week 变成 7 时，说明第 6 周刚过完，进入结算
    // ==========================================
    if (state.week > 6) { 
        checkPhaseKPI();
    } else {
        loadEvent();
    }
}

// Update UI
function updateUI() {
    ['sugar', 'solo', 'money', 'bond'].forEach(k => {
        document.getElementById(`game-${k}`).innerText = state.stats[k];
    });
    
    const riskEl = document.getElementById('game-risk');
    riskEl.innerText = state.stats.risk + '%';
    if (state.stats.risk > 80) riskEl.className = "text-red-500 font-bold animate-pulse";
    else riskEl.className = "text-orange-500 font-bold";

    const config = PHASE_CONFIG[state.phase - 1];
    document.getElementById('phase-title').innerText = `PHASE ${state.phase} ${config.name}`;
    document.getElementById('phase-desc').innerText = config.desc;
    document.getElementById('week-badge').innerText = state.week;

    const kpiContainer = document.getElementById('kpi-container');
    kpiContainer.innerHTML = '';

    
    
    if(config.kpis.length > 0) {
        config.kpis.forEach(k => {
            const current = state.stats[k.type];
            let percent = 0;
            let color = 'bg-gradient-to-r from-green-400 to-emerald-500';
            
            if(k.type === 'risk') {
                // 风险控制：目标是≤60，反向计算百分比
                percent = Math.max(0, Math.min(100, ((k.target - current) / k.target) * 100));
                color = 'bg-gradient-to-r from-orange-400 to-red-500';
            } else {
                percent = Math.min(100, (current / k.target) * 100);
            }

            // 不同类型的进度条颜色
            if (k.type === 'sugar') color = 'bg-gradient-to-r from-pink-400 to-rose-500';
            else if (k.type === 'money') color = 'bg-gradient-to-r from-yellow-400 to-amber-500';
            else if (k.type === 'solo') color = 'bg-gradient-to-r from-purple-400 to-violet-500';

            const div = document.createElement('div');
            div.className = "mb-1";
            div.innerHTML = `
                <div class="flex justify-between text-[10px] text-slate-400 mb-0.5">
                    <span>${k.label} (${k.type === 'risk' ? `≤${k.target}` : `${current}/${k.target}`})</span>
                    <span>${Math.floor(percent)}%</span>
                </div>
                <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full ${color} transition-all duration-500" style="width: ${percent}%"></div>
                </div>
            `;
            kpiContainer.appendChild(div);
        });
    } else {
        kpiContainer.innerHTML = '<div class="text-xs text-slate-500 text-center">终局时刻，遵从内心</div>';
    }

    document.getElementById('stats-money').innerText = state.stats.money;
    document.getElementById('stats-risk').innerText = state.stats.risk + '%';
    
    const buffContainer = document.getElementById('stats-buffs');
    if(state.buffs.length > 0) {
        buffContainer.innerHTML = state.buffs.map(b => 
            `<span class="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">${b.name}</span>`
        ).join('');
    } else {
        buffContainer.innerHTML = '<span class="text-xs text-slate-500">无</span>';
    }
}

// KPI Check
function checkPhaseKPI() {
    const config = PHASE_CONFIG[state.phase - 1];
    let pass = true;
    let failReason = "";

    config.kpis.forEach(k => {
        if(k.type === 'risk') {
            // 风险控制：当前值 > 目标值 则不通过
            if(state.stats.risk > k.target) {
                pass = false;
                failReason = `${k.label}超标 (当前${state.stats.risk} > 上限${k.target})`;
            }
        } else {
            // 其他KPI：当前值 < 目标值 则不通过
            if(state.stats[k.type] < k.target) {
                pass = false;
                failReason = `${k.label}未达标 (当前${state.stats[k.type]} < 目标${k.target})`;
            }
        }
    });

    if(pass) {
        showReport(true, `恭喜完成【${config.name}】目标！\n\n资方对你的表现很满意，追加了下一阶段的预算。`);
    } else {
        showReport(false, `考核失败：${failReason}\n\n公司认为你没有红的潜质，决定停止投入，提前解约。`);
    }
}

function showReport(pass, text) {
    const modal = document.getElementById('modal-report');
    modal.classList.remove('hidden');
    const title = document.getElementById('report-title');
    title.innerText = pass ? "阶段完成 🎉" : "GAME OVER";
    title.className = pass ? "text-2xl font-black mb-2 text-emerald-400" : "text-2xl font-black mb-2 text-red-500";
    document.getElementById('report-content').innerText = text;
    const btn = document.getElementById('btn-next-phase');
    if(pass) {
        btn.innerText = "进入下一阶段 →";
        btn.onclick = () => {
            modal.classList.add('hidden');
            state.phase++;
            // 重置当前阶段的已用事件
            state.usedEvents = new Set([...state.usedEvents].filter(k => !k.startsWith(`${state.phase}-`)));
            state.week = 1; // 新阶段重置周数
            updateUI();
            loadEvent();
        };
    } else {
        btn.innerText = "🔄 重新出道";
        btn.onclick = () => location.reload();
    }
}

// Endings
function calcEnding(type) {
    let id = 5; 
    let title = ""; 
    let desc = "";
    // 解构状态值：bond(羁绊值)、sugar(糖度值)、solo(单人营业值)、risk(政策/舆论风险值)
    const { bond, sugar, solo, risk } = state.stats;

    // ===== 新增结局（精简标题）=====
    // 1. 营业翻车结局（高糖+极高风险）
    if (type === 'bind' && sugar > 500 && risk > 70) {
        id = 11; 
        title = "营业翻车封杀"; 
        desc = "CP营销太过火触发清朗行动，被全网点名批评。\n不仅解绑，还被限制出镜，彻底糊穿地心。";
    }
    // 2. 隐婚结局（高羁绊+中等风险）
    else if (bond > 75 && risk > 40 && risk < 60 && sugar > 300) {
        id = 12; 
        title = "隐婚终被扒出"; 
        desc = "你们偷偷领证隐婚，对外只称“好兄弟”。\n多年后被狗仔拍到同回婚房，全网炸锅。";
    }
    // 3. 复婚营业结局（解绑后又合体）
    else if (type === 'solo' && bond > 50 && solo < 300 && sugar > 200) {
        id = 13; 
        title = "解绑又复婚"; 
        desc = "刚官宣解绑三个月，又因商务合约合体营业。\n唯粉气到脱粉，CP粉直呼“复婚快乐”。";
    }
    // 4. 友情以上恋人未满（中等羁绊+中等糖度）
    else if (bond > 40 && bond < 60 && sugar > 200 && sugar < 400) {
        id = 14; 
        title = "友达以上"; 
        desc = "有过心动，也有过默契，但终究止步于朋友。\n采访里提到彼此，只会说“是很好的兄弟”。";
    }
    // 5. 商业联姻结局（绑定但低羁绊）
    else if (type === 'bind' && bond < 30 && sugar > 400 && risk < 30) {
        id = 15; 
        title = "商业联姻"; 
        desc = "没有任何私人感情，全靠资本捆绑营业。\n私下零互动，营业结束立刻分道扬镳。";
    }
    // 6. 海外发展结局（退圈但中等羁绊）
    else if (type === 'quit' && bond > 40 && bond < 60) {
        id = 16; 
        title = "海外低调相伴"; 
        desc = "放弃内娱事业去海外发展，不公开关系。\n偶尔被网友偶遇，两人逛超市像普通情侣。";
    }
    // 7. 被迫解绑结局（极高风险）
    else if (type === 'solo' && risk > 80 && bond > 60) {
        id = 17; 
        title = "被迫解绑"; 
        desc = "平台和广电双重施压，连夜发解绑声明。\n哪怕羁绊再深，也只能从此避嫌。";
    }
    // 8. 意难平结局（高羁绊+低糖度）
    else if (bond > 70 && sugar < 200 && risk < 40) {
        id = 18; 
        title = "意难平"; 
        desc = "明明动了心，却因公司要求不敢营业。\n剧播完后再也没同框，成为粉丝心中的意难平。";
    }

    // ===== 原有结局（数值已下调，标题不变）=====
    else if(type === 'quit' && bond >= 60) {
        id = 10; 
        title = "退圈成真"; 
        desc = "你们放弃了顶流的光环，去国外领了证。\n虽然查无此人，但你们拥有了彼此。";
    }
    else if (type === 'solo' && bond < 10) {
        id = 6; 
        title = "老死不相往来"; 
        desc = "解绑非常难看，双方粉丝常年互撕。\n哪怕同台领奖，中间也要隔着三个人。";
    }
    else if (type === 'bind' && sugar > 600 && risk < 40) {
        id = 1; 
        title = "内娱第一官配"; 
        desc = "你们创造了CP界的商业奇迹。\n每一年纪念日，全网都在狂欢。";
    }
    else if (bond > 70 && risk > 50) {
        id = 2; 
        title = "真情侣隐藏结局"; 
        desc = "虽然没有官宣，但圈内人都知道你们是真的。\n那种眼神，是演不出来的。";
    }
    else if (type === 'solo' && bond >= 15) {
        id = 3; 
        title = "体面解绑，各自美丽"; 
        desc = "和平分手，顶峰相见。\n偶尔在红毯遇到，还能微笑着打个招呼。";
    }
    else if (solo > 600 && bond < 40) {
        id = 7; 
        title = "唯粉大战，两败俱伤"; 
        desc = "粉丝撕得太难看，导致路人缘全面崩盘。\n品牌方都不敢找你们了。";
    }
    else {
        id = 5; 
        title = "麦麸营业工具人"; 
        desc = "一切都是生意。剧播完，人也就散了。\n甚至连微信都没加。";
    }
    
    showEnding(id, title, desc);
}

function showEnding(id, title, desc) {
    const modal = document.getElementById('modal-report');
    modal.classList.remove('hidden');
    document.getElementById('report-icon').innerText = "🏆";
    document.getElementById('report-title').innerText = title;
    document.getElementById('report-content').innerText = desc + `\n\n最终得分: ${state.stats.sugar + state.stats.money}`;    document.getElementById('report-content').innerText = desc + `\n\n最终得分: ${state.stats.sugar + state.stats.money}`;
    const btn = document.getElementById('btn-next-phase');
    btn.innerText = "🔄 再玩一次";
    btn.onclick = () => location.reload();
}

function toggleShop() { document.getElementById('modal-shop').classList.toggle('hidden'); }
function toggleStats() { document.getElementById('modal-stats').classList.toggle('hidden'); }
function buyItem(t) {
    // 修改：商城道具性价比更合理
    let cost = 0; let eff = {};
    if(t==='sugar') { cost=180; eff={sugar:50}; } // 原200/60→180/50
    if(t==='risk') { cost=250; eff={risk:-20}; } // 原300/25→250/20
    if(t==='bond') { cost=120; eff={bond:25}; } // 原150/20→120/25
    if(state.stats.money >= cost) {
        state.stats.money -= cost;
        state.stats.sugar += eff.sugar || 0;
        state.stats.risk += eff.risk || 0;
        state.stats.bond += eff.bond || 0;
        showToast({...eff, money: -cost});
        updateUI();
        toggleShop();
    } else { alert("余额不足！"); }
}

function showToast(eff) {
    const box = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = "glass px-4 py-2 rounded-full mb-2 text-sm font-bold flex gap-2 toast-enter border border-white/10 shadow-lg";
    let h = "";
    if(eff.sugar) h+=`<span class="${eff.sugar>0?'text-pink-400':'text-gray-400'}">🍬${eff.sugar>0?'+':''}${eff.sugar}</span>`;
    if(eff.solo) h+=`<span class="${eff.solo>0?'text-purple-400':'text-gray-400'}">⚔️${eff.solo>0?'+':''}${eff.solo}</span>`;
    if(eff.money) h+=`<span class="${eff.money>0?'text-yellow-400':'text-gray-400'}">💰${eff.money>0?'+':''}${eff.money}</span>`;
    if(eff.risk) h+=`<span class="${eff.risk>0?'text-red-500':'text-green-500'}">💣${eff.risk>0?'+':''}${eff.risk}</span>`;
    el.innerHTML = h || "<span>操作生效</span>";
    box.appendChild(el);
    setTimeout(()=>el.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    initSliders(); // 替换原来的 updateAttrUI()
});
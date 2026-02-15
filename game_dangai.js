// ================= 核心配置 (KPI重制版) =================
const PHASE_CONFIG = [
    { 
        id: 1, name: "备案筹备期", 
        kpis: [ { type: 'risk', target: 20, label: '合规风险', isMax: true } ],
        desc: "“双男主101的战场，从备案就已经开始了。”" 
    },
    { 
        id: 2, name: "拍摄制作期", 
        // 目标 CP 设定为 100，利用初始属性加成，这不再是难事
        kpis: [ { type: 'platform', target: 60, label: '平台看片好感' }, { type: 'risk', target: 30, label: '合规风险' } ],
        desc: "“每一场对手戏，路透都在试探热搜和边界。”" 
    },
    { 
        id: 3, name: "过审修改期", 
        kpis: [ { type: 'risk', target: 35, label: '合规风险', isMax: true }, { type: 'platform', target: 80, label: '平台好感度' } ],
        desc: "“优化的不仅是互动线，还有你的爆款梦。”" 
    },
    { 
        id: 4, name: "宣发预热期", 
        kpis: [ { type: 'cp', target: 120, label: 'CP热度' }, { type: 'play', target: 100, label: '预告播放（百万）' } ],
        desc: "“买热搜、炒CP，一切为了首播数据。”" 
    },
    { 
        id: 5, name: "上线播出期", 
        kpis: [ { type: 'play', target: 200, label: '播放量（百万）' }, { type: 'money', target: 500, label: '粉丝氪金' } ],
        desc: "“空降播出还是定档跳票，平台说了算。”" 
    },
    { id: 6, name: "售后营业期", kpis: [], desc: "“剧终人不散，还是解绑各自飞？”" }
];

const GOSSIP_LIB = [
    "营销号：#备案新规# 感情线不得超过15分钟，否则直接打回！",
    "路人：又一部双男主？内娱是没别的题材了吗？",
    "平台运营：这部剧的CP感不行，建议补拍几个互动镜头。",
    "审核员：把第18集的吻戏删了，改成拍肩。",
    "粉丝：哥哥的新剧终于要抬了！集资冲播放量！",
    "业内：又收紧了，好几部剧直接积压。",
    "热搜：#XX空降播出# 服务器都被粉丝挤崩了！",
    "竞品剧宣发：连夜买水军刷黑评，压死这部！",
    "CP粉：扒了108个糖点，这剧不爆没天理！",
    "唯粉：抱走哥哥，别再麦麸了，专注演员事业！",
    "平台：播放量没达标，下周的推荐位取消。",
    "宣发：没钱买热搜了，让演员自己发微博营业吧。",
    "编剧：原著的感情线全改了，现在就是兄弟情。",
    "热搜：#XX双男主剧被下线# 合规风险还是没躲过。",
    "粉丝：氪金百万，结果剧被删减得只剩骨架，血亏！",
    "演员工作室：双方只是同事，请勿过度解读CP。",
    "资方：播放量破亿，追加500万宣发预算！",
    "售后运营：双人直播取消，合规风险太高。",
    "路人：这双男主剧的剧情还不如短视频好看，弃了。"
];

// 核心事件库
const RAW_EVENTS = {
    1: [
        // 原事件保留
        { t: "备案时，内容评审要求将剧名从《心动轨迹》改为《青春并肩走》。", i: "📝", o: [
            { t: "立刻改名，低调备案", e: { risk: -5, platform: 10 } },
            { t: "找关系沟通，保留原名", e: { risk: 15, platform: -5, money: -100 } },
            { t: "改名但加副标题，暗度陈仓", e: { risk: 10, cp: 8 } }
        ]},
        { t: "投资方要求增加吻戏和亲密互动，提高CP感。", i: "💋", o: [
            { t: "答应，剧本里加大量亲密戏", e: { cp: 20, risk: 20, platform: -10 } },
            { t: "拒绝，优先保证合规", e: { risk: -5, platform: 15, cp: -5 } },
            { t: "折中，加隐晦互动（碰手/对视）", e: { cp: 10, risk: 8, platform: 5 } }
        ]},
        { t: "竞品剧提前备案，抢占同类题材先机。", i: "🚀", o: [
            { t: "加速备案流程，砸钱插队", e: { money: -150, risk: 10, platform: 8 } },
            { t: "修改题材标签，避开直接竞争", e: { risk: -5, cp: -8, platform: 10 } },
            { t: "无视，按原计划推进", e: { risk: 5, cp: 5, money: 0 } }
        ]},
        { t: "行业风向收紧，立项审核周期延长。", i: "⏳", o: [
            { t: "暂停备案，观望风向", e: { risk: -8, cp: -10, platform: 5 } },
            { t: "找资深合规顾问修改剧本", e: { money: -200, risk: -10, platform: 12 } },
            { t: "照常提交，赌一把运气", e: { risk: 25, cp: 15, platform: -8 } }
        ]},
        { t: "选角阶段，流量小生要求加戏，提高番位。", i: "🌟", o: [
            { t: "答应加戏，保证番位", e: { cp: 10, risk: 5, money: -200 } },
            { t: "拒绝，坚持双男主平番", e: { platform: 10, risk: -5, cp: -5 } },
            { t: "折中，加戏但不改番位", e: { cp: 8, money: -100, platform: 5 } }
        ]},
        { t: "备案材料被打回，要求删减“原著情感”相关元素。", i: "❌", o: [
            { t: "按要求删减，彻底改为兄弟情", e: { risk: -10, platform: 20, cp: -15 } },
            { t: "轻微修改，保留核心互动", e: { risk: 10, cp: 15, platform: -5 } },
            { t: "找关系疏通，原样提交", e: { money: -300, risk: 15, platform: 8 } }
        ]},
        // 新增事件（备案筹备期）
        { t: "平台风控部门提前沟通：建议弱化双男主感情线，增加群像剧情。", i: "📊", o: [
            { t: "完全配合，大幅调整剧本", e: { risk: -12, platform: 18, cp: -10 } },
            { t: "表面答应，小幅度修改", e: { risk: 5, platform: 5, cp: 5 } },
            { t: "拒绝调整，坚持原设定", e: { risk: 20, platform: -10, cp: 12 } }
        ]},
        { t: "编剧团队提出：为过审将“爱情线”改为“知己线”，保留核心互动。", i: "✍️", o: [
            { t: "采纳建议，修改剧本", e: { risk: -8, cp: 8, money: -50 } },
            { t: "拒绝修改，维持爱情线框架", e: { risk: 15, cp: 15, platform: -8 } },
            { t: "折中，只保留关键知己互动", e: { risk: 3, cp: 10, platform: 5 } }
        ]},
        { t: "备案公示期，有网友举报你的剧“涉嫌过度娱乐化”，要求驳回备案。", i: "🚨", o: [
            { t: "公关删帖，低调回应", e: { money: -100, risk: 8, platform: 5 } },
            { t: "发布声明澄清是“正能量兄弟情”", e: { risk: -5, cp: -8, platform: 10 } },
            { t: "无视举报，等待审核结果", e: { risk: 18, cp: 10, money: 0 } }
        ]}
    ],
    2: [
        // 原事件保留
        { t: "拍摄时，被路人举报“内容导向问题”，内容评审组突击检查。", i: "🚨", o: [
            { t: "暂停拍摄，整改剧本", e: { risk: -10, play: -50, platform: 10, money: -80 } },
            { t: "继续拍摄，找关系摆平", e: { risk: 20, money: -250, platform: -5 } },
            { t: "伪装成普通励志剧拍摄，避过检查", e: { risk: 8, cp: -10, platform: 12 } }
        ]},
        { t: "演员拍摄亲密戏时放不开，CP感不足。", i: "🤝", o: [
            { t: "加钱让演员提前培养感情", e: { cp: 30, platform: 5, money: -150 } },
            { t: "删减亲密戏，用镜头语言弥补", e: { cp: 5, risk: -5, platform: 10 } },
            { t: "要求演员硬演，多拍几遍", e: { cp: 15, risk: 5, platform: -5 } }
        ]},
        { t: "原著粉抗议改编幅度太大，要求还原剧情。", i: "📖", o: [
            { t: "修改剧本，还原核心剧情", e: { platform: 15, money: -100, risk: 8 } },
            { t: "无视抗议，按原剧本拍摄", e: { platform: -8, money: 0, cp: -5 } },
            { t: "发公告安抚粉丝，小幅度修改", e: { platform: 5, money: -50, risk: 3 } }
        ]},
        { t: "拍摄场地被临时征用，需要更换拍摄地点。", i: "🏡", o: [
            { t: "高价租用替代场地，不耽误进度", e: { money: -200, play: 10, risk: 5 } },
            { t: "延期拍摄，重新找场地", e: { risk: -5, money: -50, play: -20 } },
            { t: "简化场景，室内拍摄替代外景", e: { platform: -10, risk: -3, money: -80 } }
        ]},
        { t: "平台方探班，要求增加广告植入戏份。", i: "📺", o: [
            { t: "答应植入，增加宣发预算", e: { platform: 25, money: 100, play: -8 } },
            { t: "拒绝，保证剧情完整性", e: { platform: -10, play: 15, risk: -5 } },
            { t: "少量植入，不影响剧情", e: { platform: 10, money: 50, play: 5 } }
        ]},
        { t: "演员因番位问题闹矛盾，拍摄进度停滞。", i: "⚔️", o: [
            { t: "出面调解，平番并加片酬", e: { cp: 5, money: -180, risk: 8 } },
            { t: "偏袒流量演员，压下另一方", e: { cp: -10, platform: 5, money: 0 } },
            { t: "暂停拍摄，换演员重拍", e: { cp: -5, risk: 15, money: -300 } }
        ]},
        // 新增事件（拍摄制作期）
        { t: "道具组为省钱使用劣质服化道，被路透后遭粉丝吐槽“廉价感”。", i: "🧵", o: [
            { t: "紧急更换服化道，追加预算", e: { money: -120, cp: 8, play: 5 } },
            { t: "无视吐槽，继续拍摄", e: { cp: -10, play: -8, platform: -5 } },
            { t: "发博道歉，承诺后期精修", e: { cp: -3, platform: 8, money: -30 } }
        ]},
        { t: "主演之一轧戏导致拍摄进度滞后，平台要求加快进度。", i: "⏰", o: [
            { t: "加钱让演员推掉其他工作，专注拍摄", e: { money: -200, cp: 10, play: 15 } },
            { t: "用替身拍摄部分戏份", e: { cp: -15, risk: 8, play: -5 } },
            { t: "申请延期，保证拍摄质量", e: { platform: -8, risk: -5, play: 10 } }
        ]},
        { t: "拍摄期间，狗仔拍到双男主私下聚餐，CP粉狂欢导致热搜爆了。", i: "📸", o: [
            { t: "引导粉丝理性磕CP，低调处理", e: { cp: 20, risk: 12, platform: 5 } },
            { t: "辟谣只是同事聚餐，解绑CP", e: { cp: -10, risk: -5, platform: 8 } },
            { t: "趁机营销，放出更多互动路透", e: { cp: 30, risk: 18, play: 10 } }
        ]},
        { t: "新规要求所有双男主剧增加励志剧情。", i: "🚨", o: [
            { t: "补拍励志剧情，融入主线", e: { risk: -10, platform: 15, money: -150 } },
            { t: "生硬插入剧情，快速过审", e: { risk: -5, cp: -8, play: -5 } },
            { t: "拒绝补拍，赌新规不追溯", e: { risk: 25, platform: -15, play: -10 } }
        ]}
    ],
    3: [
        // 原事件保留
        { t: "内容评审时，要求删减90%的亲密戏，只剩兄弟情。", i: "✂️", o: [
            { t: "按要求删减，保证合规", e: { risk: -15, platform: 20, cp: -30 } },
            { t: "偷偷保留部分戏份，蒙混过关", e: { risk: 20, cp: 25, platform: -10 } },
            { t: "找评审员沟通，少删减关键戏份", e: { money: -250, risk: 5, cp: 10 } }
        ]},
        { t: "平台审核要求增加“正能量”剧情，弘扬主流价值观。", i: "🌟", o: [
            { t: "补拍正能量剧情，加长剧集", e: { risk: -10, platform: 18, money: -200 } },
            { t: "拒绝补拍，修改现有剧情", e: { risk: 10, platform: -8 } },
            { t: "折中，少量补拍，不影响主线", e: { risk: -5, platform: 10, cp: 5 } }
        ]},
        { t: "平台方要求调整播出时间，避开合规严查期。", i: "🕒", o: [
            { t: "同意延期播出，等待窗口期", e: { risk: -8, platform: 15, cp: -10 } },
            { t: "坚持原档期，赌政策宽松", e: { risk: 20, cp: 15, platform: -10 } },
            { t: "空降播出，不提前宣发", e: { risk: 15, play: 20, platform: 5 } }
        ]},
        { t: "审核发现剧中有“不合规”台词，要求全部修改。", i: "🗣️", o: [
            { t: "全部重配台词，替换不合规内容", e: { risk: -12, money: -150, platform: -5 } },
            { t: "少量修改，保留核心意思", e: { risk: 10, platform: 8, cp: -5 } },
            { t: "找关系豁免，不修改台词", e: { money: -300, risk: 15, platform: 5 } }
        ]},
        { t: "竞品剧举报你的剧“题材敏感”，要求从严审核。", i: "🚫", o: [
            { t: "公关处理，压下举报", e: { money: -200, risk: 8, platform: 10 } },
            { t: "反举报竞品剧，互相伤害", e: { risk: 25, platform: -5, cp: 8 } },
            { t: "无视，专注自身过审", e: { risk: 10, platform: 5, cp: -5 } }
        ]},
        { t: "内容评审最后阶段，评审员要求更换主演，降低CP感。", i: "🎭", o: [
            { t: "答应更换，保证过审", e: { risk: -10, cp: -30, platform: 10 } },
            { t: "拒绝更换，放弃过审", e: { risk: 30, platform: -20, money: -50 } },
            { t: "沟通换配角，保留主演", e: { risk: 5, cp: -5, money: -180 } }
        ]},
        // 新增事件（过审修改期）
        { t: "评审要求删除所有“眼神拉丝”“牵手”等隐晦亲密镜头。", i: "👀", o: [
            { t: "全部删除，彻底合规", e: { risk: -15, cp: -25, platform: 20 } },
            { t: "只删明显镜头，保留隐晦的", e: { risk: 5, cp: 10, platform: 5 } },
            { t: "技术处理（模糊/快进）保留镜头", e: { risk: 20, cp: 18, platform: -10 } }
        ]},
        { t: "平台要求增加“会员专属彩蛋”，包含少量未删减互动。", i: "🥚", o: [
            { t: "答应制作，吸引付费", e: { money: 150, cp: 20, risk: 10 } },
            { t: "拒绝，避免额外风险", e: { risk: -5, money: -50, platform: -8 } },
            { t: "制作无CP彩蛋，主打剧情", e: { money: 80, cp: 5, risk: -3 } }
        ]},
        { t: "过审后发现，评审员是竞品剧资方的亲戚，故意卡流程。", i: "🤫", o: [
            { t: "高价疏通关系，加快上线", e: { money: -350, risk: 8, platform: 12 } },
            { t: "举报评审员违规，鱼死网破", e: { risk: 20, platform: -15, play: -10 } },
            { t: "申请更换评审员，重新审核", e: { risk: -5, money: -100, play: -5 } }
        ]}
    ],
    4: [
        // 原事件保留
        { t: "宣发期，平台要求限制CP营销，避免合规风险。", i: "📢", o: [
            { t: "听从要求，主打剧情向宣发", e: { risk: -8, cp: -20, play: 10 } },
            { t: "偷偷买CP热搜，暗地营销", e: { risk: 15, cp: 30, platform: -10 } },
            { t: "折中，少量CP营销+剧情营销", e: { risk: 5, cp: 15, platform: 5 } }
        ]},
        { t: "演员粉丝互撕，要求停止双人宣发。", i: "⚛️", o: [
            { t: "停止双人宣发，主打单人营销", e: { cp: -15, money: 10, platform: 5 } },
            { t: "无视粉丝，继续双人宣发", e: { cp: 20, money: -20, risk: 8 } },
            { t: "安抚双方粉丝，发单人+双人物料", e: { cp: 10, money: 5, risk: 3 } }
        ]},
        { t: "宣发预算不足，无法购买热搜和推广位。", i: "💰", o: [
            { t: "找演员工作室自费宣发", e: { money: -100, cp: 15, platform: -5 } },
            { t: "放弃买热搜，专注短视频营销", e: { cp: 8, play: 15, platform: 8 } },
            { t: "削减制作成本，追加宣发预算", e: { platform: -8, cp: 20, money: -150 } }
        ]},
        { t: "首播前一天，平台要求临时调整播出集数。", i: "📺", o: [
            { t: "同意调整，满足平台要求", e: { platform: 20, play: 10, cp: -5 } },
            { t: "拒绝调整，坚持原计划", e: { platform: -15, play: -5, risk: 10 } },
            { t: "折中，少量调整，不影响主线", e: { platform: 10, play: 5, cp: -3 } }
        ]},
        { t: "宣发物料泄露，核心剧情和CP名场面被提前曝光。", i: "🔓", o: [
            { t: "紧急公关，删除泄露物料", e: { money: -120, risk: 5, play: -10 } },
            { t: "顺水推舟，提前预热", e: { cp: 25, play: 20, risk: 8 } },
            { t: "无视，按原计划宣发", e: { cp: 10, play: 15, risk: 5 } }
        ]},
        { t: "竞品剧买水军刷黑评，抹黑你的剧“剧情拉胯”。", i: "🖤", o: [
            { t: "反买水军刷好评，压过黑评", e: { money: -180, play: 15, risk: 10 } },
            { t: "无视黑评，专注自家宣发", e: { risk: -5, play: 8, cp: 5 } },
            { t: "放出高光片段，用实力打脸", e: { platform: 15, play: 20, money: -80 } }
        ]},
        // 新增事件（宣发预热期）
        { t: "演员直播口误称“这是一部双男主剧”，被约谈警告。", i: "🗣️", o: [
            { t: "让演员公开道歉，强调是“兄弟情”", e: { risk: -8, cp: -15, platform: 10 } },
            { t: "冷处理，暂停所有直播宣发", e: { risk: 5, cp: -10, play: -8 } },
            { t: "甩锅给直播平台，继续宣发", e: { risk: 18, cp: 10, platform: -15 } }
        ]},
        { t: "【短视频平台限流所有CP相关物料，播放量骤降。", i: "📱", o: [
            { t: "调整物料，主打剧情/演技向", e: { risk: -5, play: 10, cp: -8 } },
            { t: "买通平台运营，恢复流量", e: { money: -200, play: 25, risk: 10 } },
            { t: "转战小众平台宣发", e: { play: 8, cp: 12, platform: -5 } }
        ]},
        { t: "宣发期恰逢“专项整治”升级，所有双男主相关营销被限制。", i: "🌐", o: [
            { t: "暂停所有宣发，等待行动结束", e: { risk: -10, play: -15, cp: -5 } },
            { t: "改为“正能量剧集”营销，避开题材标签", e: { risk: -5, play: 8, cp: -10 } },
            { t: "地下营销，粉丝群内发物料", e: { risk: 15, cp: 20, play: 5 } }
        ]},
        { t: "顶流网红主动要求合作推广，报价远超宣发预算。", i: "🔥", o: [
            { t: "高价签约，全网推广", e: { money: -300, play: 50, cp: 20 } },
            { t: "拒绝，选择中小网红矩阵推广", e: { money: -100, play: 15, cp: 8 } },
            { t: "置换资源，用剧集周边抵广告费", e: { money: -50, play: 20, cp: 10 } }
        ]}
    ],
    5: [
        // 原事件保留
        { t: "播出后，播放量破亿，但合规风险预警升级。", i: "📈", o: [
            { t: "暂停上线部分集数，优化后重新上线", e: { risk: -10, play: -50, cp: -15 } },
            { t: "继续播出，找关系压下风险", e: { risk: 25, play: 30, money: -200 } },
            { t: "减少营销，低调播出", e: { risk: 5, play: 15, cp: -8 } }
        ]},
        { t: "粉丝氪金打投，但要求演员增加双人营业。", i: "💸", o: [
            { t: "安排双人直播，满足粉丝要求", e: { money: 150, cp: 25, risk: 15 } },
            { t: "拒绝，只安排单人营业", e: { money: -50, cp: -10, platform: 8 } },
            { t: "少量双人营业，主打剧情互动", e: { money: 80, cp: 10, risk: 5 } }
        ]},
        { t: "平台要求加更，但制作方赶不上进度。", i: "⏩", o: [
            { t: "加班赶制，满足加更要求", e: { platform: 20, play: 25, money: -50 } },
            { t: "拒绝加更，保证制作质量", e: { platform: -10, play: -5 } },
            { t: "折中，少量加更，其余延期", e: { platform: 10, play: 15, money: -20 } }
        ]},
        { t: "播出中期，剧情被吐槽“魔改”，口碑下滑。", i: "👎", o: [
            { t: "放出原著剧情对比，解释改编原因", e: { platform: 10, play: 8, money: -50 } },
            { t: "无视吐槽，继续按原剧情播出", e: { risk: 5, play: -5, cp: -3 } },
            { t: "临时修改后续剧情，贴合原著", e: { platform: 15, play: 15, money: -120 } }
        ]},
        { t: "审核标准突然收紧，平台要求暂停播出优化。", i: "🛑", o: [
            { t: "立刻暂停，全面优化", e: { risk: -15, platform: 15, play: -30 } },
            { t: "偷偷继续播出，海外上线", e: { risk: 30, play: 20, platform: -20 } },
            { t: "沟通平台，缩短整改周期", e: { money: -250, risk: 10, platform: 8 } }
        ]},
        { t: "播放量达标，平台要求追加番外和售后内容。", i: "🎁", o: [
            { t: "答应制作番外，增加CP内容", e: { cp: 30, play: 25, risk: 18 } },
            { t: "拒绝，专注下一部剧", e: { platform: -10, cp: -10, money: 50 } },
            { t: "制作无CP番外，主打剧情", e: { cp: 5, platform: 10, risk: -5 } }
        ]},
        // 新增事件（上线播出期）
        { t: "播出后，弹幕/评论区被平台屏蔽“CP”“耽美”等关键词。", i: "🚫", o: [
            { t: "配合平台，引导粉丝聊剧情/演技", e: { risk: -8, cp: -10, play: 5 } },
            { t: "粉丝群内引导用暗号磕CP", e: { cp: 20, risk: 12, money: 50 } },
            { t: "投诉平台，要求解除屏蔽", e: { risk: 18, platform: -15, play: -5 } }
        ]},
        { t: "抽查发现剧中有“不合规背景音乐”，要求下线整改。", i: "🎵", o: [
            { t: "立刻下线，更换背景音乐", e: { risk: -10, play: -20, money: -80 } },
            { t: "深夜偷偷上线，不整改", e: { risk: 25, play: 10, platform: -12 } },
            { t: "找专家背书，证明音乐合规", e: { money: -150, risk: 5, play: 8 } }
        ]},
        { t: "播出期间，双男主唯粉互撕上热搜，影响剧集口碑。", i: "⚔️", o: [
            { t: "发声明呼吁理性，暂停双人营业", e: { cp: -15, risk: -5, money: -30 } },
            { t: "引导CP粉控评，压下唯粉节奏", e: { cp: 10, risk: 8, money: -80 } },
            { t: "无视撕逼，靠剧集质量翻盘", e: { play: 15, cp: -5, platform: 5 } }
        ]},
        { t: "平台要求提高会员价格，包含独家花絮，否则减少推荐位。", i: "💎", o: [
            { t: "答应提价，增加独家CP花絮", e: { money: 200, cp: 15, risk: 10 } },
            { t: "拒绝提价，放弃推荐位", e: { play: -20, platform: -10, money: 0 } },
            { t: "提价但只加剧情花絮", e: { money: 100, cp: -5, risk: -3 } }
        ]}
    ],
    6: [
        // 原事件保留
        { t: "剧播完，粉丝要求双人售后（演唱会/综艺）。", i: "🎤", o: [
            { t: "安排双人售后，最大化CP价值", e: { cp: 40, money: 200, risk: 25 } },
            { t: "只安排单人售后，解绑CP", e: { cp: -20, platform: 10, risk: -10 } },
            { t: "少量双人售后，主打个人发展", e: { cp: 15, money: 100, risk: 5 } }
        ]},
        { t: "资方要求续约双人商务，继续捆绑营业。", i: "🤝", o: [
            { t: "续约捆绑，继续麦麸营业", e: { end: 'bind', cp: 50, money: 300, risk: 20 } },
            { t: "拒绝续约，解绑各自发展", e: { end: 'solo', cp: -30, platform: 15, risk: -10 } },
            { t: "短期续约，观察行业风向", e: { cp: 20, money: 150, risk: 10 } }
        ]},
        { t: "合规要求停止所有题材相关售后，全面解绑。", i: "🚫", o: [
            { t: "立刻解绑，停止所有CP营业", e: { risk: -15, cp: -40, money: -50 } },
            { t: "偷偷地下营业，不公开互动", e: { risk: 30, cp: 25, money: 50 } },
            { t: "转型正能量艺人，远离题材标签", e: { risk: -10, cp: -20, platform: 15 } }
        ]},
        { t: "【终局抉择】剧的最终收益分配，演员要求提高分成。", i: "💰", o: [
            { t: "答应提高分成，留住演员", e: { money: -150, cp: 20, platform: 5 } },
            { t: "拒绝，更换演员拍续集", e: { cp: -25, play: -10, platform: -5 } },
            { t: "折中，少量提高分成", e: { money: -80, cp: 10, platform: 5 } }
        ]},
        { t: "粉丝要求拍第二季，延续CP故事线。", i: "📝", o: [
            { t: "启动第二季筹备，延续CP线", e: { end: 'continue', cp: 45, risk: 30, money: -200 } },
            { t: "拒绝第二季，专注新剧", e: { end: 'new', cp: -20, platform: 10, risk: -5 } },
            { t: "拍第二季但更换CP，规避风险", e: { cp: 10, risk: 10, money: -100 } }
        ]},
        { t: "最终结算，你的双男主剧成为年度爆款，但合规风险仍在。", i: "🏆", o: [
            { t: "乘胜追击，继续拍双男主剧", e: { end: 'boom', play: 50, risk: 40, money: 500 } },
            { t: "转型主流剧，远离该题材", e: { end: 'turn', risk: -20, platform: 30, cp: -30 } },
            { t: "暂停新项目，观望风向", e: { end: 'wait', risk: -10, money: 100, cp: -5 } }
        ]},
        // 新增事件（售后营业期）
        { t: "CP粉集资百万应援，要求双男主合体拍杂志封面。", i: "💖", o: [
            { t: "答应拍封面，最大化氪金收益", e: { money: 250, cp: 30, risk: 20 } },
            { t: "拒绝合体，只拍单人封面", e: { cp: -20, money: -50, risk: -8 } },
            { t: "拍“无互动”合体封面，敷衍粉丝", e: { cp: 10, money: 100, risk: 5 } }
        ]},
        { t: "资方要求双男主解绑后“互撕”炒热度，提升商务价值。", i: "👊", o: [
            { t: "答应互撕，买热搜炒话题", e: { play: 20, money: 150, cp: -30 } },
            { t: "拒绝互撕，维护演员形象", e: { platform: 10, cp: -5, money: -50 } },
            { t: "表面互撕，私下和解（剧本式营销）", e: { play: 15, cp: -10, risk: 8 } }
        ]},
        { t: "海外平台高价购买版权，要求保留未删减版内容。", i: "🌍", o: [
            { t: "出售版权，提供未删减版", e: { money: 400, risk: 25, cp: 30 } },
            { t: "出售版权，但提供删减版", e: { money: 200, risk: -5, cp: -10 } },
            { t: "拒绝出售，避免合规风险", e: { risk: -10, money: 0, platform: 8 } }
        ]}
    ]
};

// ================= 游戏状态 =================
// 初始点数 18 点
const state = {
    attrs: { script: 0, actor: 0, promo: 0, policy: 0, fan: 0 },
    pointsLeft: 18, 
    stats: { play: 0, cp: 0, platform: 0, money: 0, risk: 0 },
    phase: 1,
    week: 1,
    usedEvents: new Set(),
    buffs: []
};

// ================= 核心函数 =================

// ================= 核心函数 (滑块重制版) =================

// 处理滑块拖动事件
function onSliderChange(activeKey) {
    const keys = ['script', 'actor', 'promo', 'policy', 'fan'];
    const maxPoints = 18; // 总点数

    // 1. 计算除了当前滑块之外，其他滑块占用了多少点
    let usedByOthers = 0;
    keys.forEach(k => {
        if (k !== activeKey) {
            // 获取其他滑块的当前值
            usedByOthers += parseInt(state.attrs[k]);
        }
    });

    // 2. 获取当前滑块试图设置的值
    const inputEl = document.getElementById(`input-${activeKey}`);
    let newValue = parseInt(inputEl.value);

    // 3. 计算当前滑块允许的最大值
    // 公式：最大值 = 总点数 - 其他滑块已用的
    // 同时不能超过单项上限 10
    let maxAllowed = maxPoints - usedByOthers;
    if (maxAllowed > 10) maxAllowed = 10;

    // 4. 如果试图设置的值超过了允许值，强制拉回
    if (newValue > maxAllowed) {
        newValue = maxAllowed;
        inputEl.value = newValue; // 视觉上弹回去
    }

    // 5. 更新状态
    state.attrs[activeKey] = newValue;
    
    // 6. 重新计算剩余点数
    let totalUsed = usedByOthers + newValue;
    state.pointsLeft = maxPoints - totalUsed;

    // 7. 更新UI显示 (数字和文字描述)
    updateSliderUI(activeKey, newValue);
    document.getElementById('points-left').innerText = state.pointsLeft;
}

// 专门更新滑块周边的文字UI
function updateSliderUI(key, val) {
    // 更新数字显示
    document.getElementById(`val-${key}`).innerText = val;

    // 更新文字描述
    const desc = document.getElementById(`desc-${key}`);
    
    // 简单的颜色和文案逻辑
    let colorClass = "text-slate-500";
    let text = "";

    if (key === 'script') {
        if (val <= 3) { text = "流水账剧情"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "剧情尚可"; colorClass = "text-cyan-400"; }
        else { text = "封神剧本"; colorClass = "text-cyan-300 font-bold"; }
    } else if (key === 'actor') {
        if (val <= 3) { text = "毫无CP感"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "有CP感"; colorClass = "text-pink-400"; }
        else { text = "天选CP"; colorClass = "text-pink-300 font-bold"; }
    } else if (key === 'promo') {
        if (val <= 3) { text = "零宣传"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "常规宣传"; colorClass = "text-yellow-400"; }
        else { text = "顶级宣发"; colorClass = "text-yellow-300 font-bold"; }
    } else if (key === 'policy') {
        if (val <= 3) { text = "合规困难户"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "基本合规"; colorClass = "text-red-400"; }
        else { text = "政策达人"; colorClass = "text-red-300 font-bold"; }
    } else if (key === 'fan') {
        if (val <= 3) { text = "粉丝散沙"; colorClass = "text-slate-500"; }
        else if (val <= 7) { text = "粉丝活跃"; colorClass = "text-purple-400"; }
        else { text = "氪金大户"; colorClass = "text-purple-300 font-bold"; }
    }

    desc.innerText = text;
    desc.className = `text-[10px] text-right h-4 transition-colors ${colorClass}`;
}

// 游戏初始化时也要记得重置滑块状态
// 在 document.addEventListener('DOMContentLoaded') 里调用这个
function initSliders() {
    ['script', 'actor', 'promo', 'policy', 'fan'].forEach(k => {
        document.getElementById(`input-${k}`).value = state.attrs[k];
        updateSliderUI(k, state.attrs[k]);
    });
    document.getElementById('points-left').innerText = state.pointsLeft;
}

function startGame() {
    if (window._hmt) window._hmt.push(['_trackEvent', 'Game_Dangai', 'Click_Start', '开始抬剧']);

    state.buffs = [];
    if (state.attrs.script >= 8) state.buffs.push({name:'📜 封神剧本 (后期播放爆炸)'});
    else if (state.attrs.script <= 3) state.buffs.push({name:'📃 流水账 (播放潜力低)'});
    
    if (state.attrs.actor >= 8) state.buffs.push({name:'💑 天选CP (CP热度+30)'});
    else if (state.attrs.actor <= 3) state.buffs.push({name:'🤷 无CP感 (CP发展慢)'});
    
    if (state.attrs.promo >= 8) state.buffs.push({name:'📢 顶级宣发 (初始好感高)'});
    else if (state.attrs.promo <= 3) state.buffs.push({name:'🤐 零宣传 (起步难)'});

    if (state.attrs.policy >= 8) state.buffs.push({name:'📋 政策达人 (初始风险0)'});
    else if (state.attrs.policy <= 3) state.buffs.push({name:'⚠️ 合规困难户 (初始风险+20)'});

    if (state.attrs.fan >= 8) state.buffs.push({name:'💰 氪金大户 (初始资金+300)'});
    else if (state.attrs.fan <= 3) state.buffs.push({name:'👥 散沙粉丝 (没钱公关)'});

    // 【数值优化】初始数值映射
    state.stats.play = 0; 
    
    // 修复：CP 热度不再归零，而是继承演员和宣发的属性
    // 如果演员8分，宣发5分 -> 初始CP = 64 + 10 = 74。第二阶段目标100很容易达成。
    state.stats.cp = (state.attrs.actor * 8) + (state.attrs.promo * 2);
    
    state.stats.platform = 20 + (state.attrs.script * 4) + (state.attrs.promo * 2);
    state.stats.money = 100 + (state.attrs.fan * 50);
    state.stats.risk = Math.max(0, (8 - state.attrs.policy) * 3);

    document.getElementById('screen-char').classList.add('hidden');
    const gameScreen = document.getElementById('screen-game');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('flex');
    
    updateUI();
    loadEvent();
}

function loadEvent() {
    if (state.phase === 6) {
        const phase6Count = [...state.usedEvents].filter(k => k.startsWith('6-')).length;
        if (phase6Count >= (RAW_EVENTS[6] || []).length - 1) {
            renderEvent(RAW_EVENTS[6][5] || RAW_EVENTS[6][0]); 
            return;
        }
    }

    const pool = RAW_EVENTS[state.phase];
    let available = pool.filter((ev, idx) => {
        const key = `${state.phase}-${idx}`;
        if (state.phase === 6 && idx === 5) return false;
        return !state.usedEvents.has(key);
    });

    if (available.length === 0) {
        if (state.phase === 6) { 
            renderEvent(RAW_EVENTS[6][5]); 
            return; 
        }
        available = pool; 
        [...state.usedEvents].forEach(k => { 
            if(k.startsWith(state.phase+'-')) state.usedEvents.delete(k); 
        });
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
    el.offsetHeight; 
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

function handleChoice(eff) {
    if (eff.end) { 
        calcEnding(eff.end); 
        return; 
    }

    let dPlay = eff.play || 0;
    let dCp = eff.cp || 0;
    let dPlatform = eff.platform || 0;
    let dMoney = eff.money || 0;
    let dRisk = eff.risk || 0;

    // 【倍率加成】属性高，收益更高
    if (dPlay > 0) {
        let scriptMult = 1 + (state.attrs.script * 0.1);
        dPlay = Math.floor(dPlay * scriptMult);
    }

    // 如果演员适配高，获得的CP热度会额外增加
    if (dCp > 0) {
        let actorMult = 1 + (state.attrs.actor * 0.15); // 系数提高到 0.15
        dCp = Math.floor(dCp * actorMult);
    }
    
    if (state.attrs.promo >= 7) {
        if(dPlay > 0) dPlay += 50;
        if(dCp > 0) dCp += 10;
    }

    state.stats.play += dPlay;
    state.stats.cp += dCp;
    state.stats.platform += dPlatform;
    state.stats.money += dMoney;
    state.stats.risk += dRisk;

    const checkMin = (k) => { if (state.stats[k] < 0) state.stats[k] = 0; };
    ['play', 'cp', 'platform', 'money', 'risk'].forEach(checkMin);

    // ==========================================
    // 🔴 关键修改 1：先增加周数 🔴
    // ==========================================
    state.week++;

    // ==========================================
    // 🔴 关键修改 2：然后再更新 UI 🔴
    // ==========================================
    showToast({ 
        play: dPlay, cp: dCp, platform: dPlatform, money: dMoney, risk: dRisk
    });
    updateUI();

    // 风险检查
    if (state.stats.risk >= 100) {
        state.stats.risk = 100;
        document.getElementById('game-risk').innerText = "100%";
        setTimeout(() => {
            showReport(false, "🔴 合规风险爆表 (100%)\n\n你的剧集被紧急下线，进行全面内容优化，项目彻底失败。");
        }, 500);
        return;
    }

    // ==========================================
    // 🔴 关键修改 3：判断是否结束 (抬剧版是 5 周) 🔴
    // 因为前面已经 +1 了，所以当 week 变成 6 时，说明第 5 周刚过完
    // ==========================================
    if (state.week > 5) { 
        checkPhaseKPI();
    } else {
        loadEvent();
    }
}

function updateUI() {
    ['play', 'cp', 'platform', 'money'].forEach(k => {
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
                percent = Math.max(0, Math.min(100, ((k.target - current) / k.target) * 100));
                color = 'bg-gradient-to-r from-orange-400 to-red-500';
            } else {
                percent = Math.min(100, (current / k.target) * 100);
            }

            if (k.type === 'play') color = 'bg-gradient-to-r from-cyan-400 to-blue-500';
            else if (k.type === 'cp') color = 'bg-gradient-to-r from-pink-400 to-rose-500';
            else if (k.type === 'platform') color = 'bg-gradient-to-r from-yellow-400 to-amber-500';
            else if (k.type === 'money') color = 'bg-gradient-to-r from-green-400 to-lime-500';

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
        kpiContainer.innerHTML = '<div class="text-xs text-slate-500 text-center">终局时刻，抉择未来</div>';
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

function checkPhaseKPI() {
    const config = PHASE_CONFIG[state.phase - 1];
    let pass = true;
    let failReason = "";

    config.kpis.forEach(k => {
        if(k.type === 'risk') {
            if(state.stats.risk > k.target) {
                pass = false;
                failReason = `${k.label}超标 (当前${state.stats.risk} > 上限${k.target})`;
            }
        } else {
            if(state.stats[k.type] < k.target) {
                pass = false;
                failReason = `${k.label}未达标 (当前${state.stats[k.type]} < 目标${k.target})`;
            }
        }
    });

    if(pass) {
        showReport(true, `恭喜完成【${config.name}】目标！\n\n资方对你的表现很满意，追加了下一阶段的预算。`);
    } else {
        showReport(false, `考核失败：${failReason}\n\n项目进度受阻，资方考虑暂停投入。`);
    }
}

function showReport(pass, text) {
    const modal = document.getElementById('modal-report');
    modal.classList.remove('hidden');
    const title = document.getElementById('report-title');
    if(pass) {
        title.innerText = "阶段完成 🎉";
        title.className = "text-2xl font-black mb-2 text-emerald-400";
        document.getElementById('report-icon').innerText = "✅";
    } else {
        title.innerText = "项目预警 ⚠️";
        title.className = "text-2xl font-black mb-2 text-red-500";
        document.getElementById('report-icon').innerText = "❌";
    }
    document.getElementById('report-content').innerText = text;
    const btn = document.getElementById('btn-next-phase');
    
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    if(pass) {
        newBtn.innerText = "进入下一阶段 →";
        newBtn.onclick = () => {
            modal.classList.add('hidden');
            state.phase++;
            state.usedEvents = new Set([...state.usedEvents].filter(k => !k.startsWith(`${state.phase}-`)));
            state.week = 1;
            updateUI();
            loadEvent();
        };
    } else {
        newBtn.innerText = "🔄 重新立项";
        newBtn.onclick = () => location.reload();
    }
}

function calcEnding(type) {
    let id = 5; 
    let title = ""; 
    let desc = "";
    const { play, cp, platform, money, risk } = state.stats;

    if(type === 'boom' && play > 8000 && risk < 60) {
        id = 1;
        title = "🏆 双男主顶流剧王";
        desc = "你的剧成为年度爆款，播放量破百亿，CP热度屠榜。\n虽然合规风险仍在，但你已是双男主101的最终赢家，资方追投10亿启动新剧。";
    } else if (type === 'bind' && cp > 500 && risk < 50) {
        id = 2;
        title = "🔗 CP捆绑天花板";
        desc = "你成功续约双人商务，成为内娱CP营业标杆。\n粉丝氪金超千万，资方赚得盆满钵满，但两位主演永远活在题材标签下。";
    } else if (type === 'solo' && play > 5000 && cp < 100) {
        id = 3;
        title = "🌟 单飞转型成功";
        desc = "你果断解绑CP，让演员转型主流影视剧。\n虽然失去了CP红利，但规避了合规风险，演员事业更上一层楼。";
    } else if (type === 'continue' && cp > 400 && risk < 70) {
        id = 4;
        title = "📝 第二季启动";
        desc = "你顶住合规压力启动第二季，延续原班人马CP线。\n首播播放量破亿，但合规风险持续走高，随时可能下线。";
    } else if (type === 'new' && platform > 80 && risk < 40) {
        id = 6;
        title = "🎬 转战主流赛道";
        desc = "你放弃续集，专注打造正能量主流剧。\n平台给予顶级推荐位，虽然少了CP热度，但项目稳赚不赔。";
    } else if (type === 'turn' && risk < 30 && platform > 90) {
        id = 7;
        title = "🚀 主流顶流制作人";
        desc = "你彻底远离该题材，转型制作主旋律剧集。\n获得官方认可，成为业内标杆，再也不用担惊受怕合规风险。";
    } else if (type === 'wait' && money > 1000) {
        id = 8;
        title = "💤 持币观望";
        desc = "你手握千万现金流，暂停所有新项目静待行业风向。\n同行纷纷踩雷时，你稳坐钓鱼台，等待最佳入局时机。";
    } else if (risk >= 80) {
        id = 9;
        title = "⚠️ 合规红线踩雷";
        desc = "合规风险居高不下，你的项目被列入重点监管名单。\n所有宣发被叫停，剧集无限期积压，血本无归。";
    } else if (play < 1000 && money < 200) {
        id = 10;
        title = "💸 扑街小糊剧";
        desc = "播放量惨淡，粉丝氪金寥寥无几，资方撤资跑路。\n这部剧成为你职业生涯的黑历史，无人问津。";
    } else {
        id = 5;
        title = "📈 平庸商业剧";
        desc = "既没爆火也没扑街，播放量和营收中规中矩。\n合规风险可控，演员解绑后各自发展，算是体面收场。";
    }
    showEnding(id, title, desc);
}

function showEnding(id, title, desc) {
    const modal = document.getElementById('modal-report');
    modal.classList.remove('hidden');
    document.getElementById('report-icon').innerText = "🏆";
    document.getElementById('report-title').innerText = title;
    
    const finalScore = state.stats.play + state.stats.money + state.stats.cp - state.stats.risk;
    document.getElementById('report-content').innerText = desc + `\n\n最终得分: ${finalScore}`;
    
    const btn = document.getElementById('btn-next-phase');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.innerText = "🔄 再玩一次";
    newBtn.onclick = () => location.reload();
}

function buyItem(t) {
    let cost = 0; 
    let eff = {};
    
    if(t==='play') { 
        cost=300; 
        eff={play: 1000}; 
    } 
    if(t==='risk') { 
        cost=400; 
        eff={risk: -20}; 
    } 
    if(t==='platform') { 
        cost=250; 
        eff={platform: 30}; 
    }

    if(state.stats.money >= cost) {
        state.stats.money -= cost;
        state.stats.play += eff.play || 0;
        state.stats.risk += eff.risk || 0;
        state.stats.platform += eff.platform || 0;
        
        showToast({...eff, money: -cost});
        updateUI();
        toggleShop();
    } else { 
        alert("余额不足！"); 
    }
}

function showToast(eff) {
    const box = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = "glass px-4 py-2 rounded-full mb-2 text-sm font-bold flex gap-2 toast-enter border border-white/10 shadow-lg";
    let h = "";
    
    if(eff.play) h+=`<span class="${eff.play>0?'text-cyan-400':'text-gray-400'}">📺${eff.play>0?'+':''}${eff.play}</span>`;
    if(eff.cp) h+=`<span class="${eff.cp>0?'text-pink-400':'text-gray-400'}">💖${eff.cp>0?'+':''}${eff.cp}</span>`;
    if(eff.platform) h+=`<span class="${eff.platform>0?'text-yellow-400':'text-gray-400'}">🏢${eff.platform>0?'+':''}${eff.platform}</span>`;
    if(eff.money) h+=`<span class="${eff.money>0?'text-green-400':'text-gray-400'}">💰${eff.money>0?'+':''}${eff.money}</span>`;
    if(eff.risk) h+=`<span class="${eff.risk>0?'text-red-500':'text-green-500'}">⚠️${eff.risk>0?'+':''}${eff.risk}</span>`;
    
    el.innerHTML = h || "<span>操作生效</span>";
    box.appendChild(el);
    setTimeout(()=>el.remove(), 2000);
}

function toggleShop() { document.getElementById('modal-shop').classList.toggle('hidden'); }
function toggleStats() { document.getElementById('modal-stats').classList.toggle('hidden'); }
function nextPhase() { alert("请等待当前阶段结束"); }

document.addEventListener('DOMContentLoaded', () => {
    // 替换原本的 updateAttrUI()
    initSliders(); 
});
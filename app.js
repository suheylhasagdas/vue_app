new Vue ({
    el : "#app",
    data: {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : []
    },
    methods: {
        start_game : function(){
            this.game_is_on = true;
        },
        attack : function(){
            var point = this.create_random_value(10);
            this.monster_heal -= point;
            this.add_to_log({turn : "P", text : "Oyuncu Saldırısı (" + point + ")"});
            this.monster_attack();
        },
        special_attack : function(){
            var point = this.create_random_value(25);
            this.monster_heal -= point;
            this.add_to_log({turn : "P", text : "Oyuncu Ulti Saldırısı (" + point + ")"});
            this.monster_attack();
        },
        heal_up : function(){
            var point = this.create_random_value(20);
            this.player_heal += point;
            this.add_to_log({turn : "P", text : "Oyuncu İlk Yardım (" + point + ")"});
            this.monster_attack();
        },
        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({turn : "P", text : "Oyuncu Pes Etti!"});
        },
        monster_attack : function(){
            var point = this.create_random_value(15);
            this.player_heal -= point;
            this.add_to_log({turn : "C", text : "Canavar Saldırısı (" + point + ")"});
        },
        create_random_value : function(step){
            return Math.ceil(Math.random() * step);
        },
        add_to_log : function(log){
            this.logs.push(log);
        }
    },
    watch : {
        player_heal : function(value){
            if(value < 0){
                this.player_heal = 0;
                if(confirm("Oyunu KAYBETTİN. Tekrar denemek ister misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            }else if(value > 100){
                this.player_heal = 100;
            }
        },
        monster_heal : function(value){
            if(value < 0){
                this.monster_heal = 0;
                if(confirm("Oyunu KAZANDIN. Tekrar oynamak ister misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            }else if(value > 100){
                this.monster_heal = 100;
            }
        }
    }
})
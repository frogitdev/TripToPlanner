const vueContent = {
    template: `
        <main>
            <div id="header">
                <div :class="scr=='main' ? 'menu-selec' : ''" @click="scr='main'">일정</div>
                <div>★ T T P ★</div>
                <div :class="scr=='money' ? 'menu-selec' : ''" @click="scr='money'">예산</div>
            </div>
            <div v-if="scr == 'main'">
                <div id="trxbox-container">
                    <div v-for="(s,sdx) in m.SCH" :key="sdx">
                    <template v-if="sdx>0">
                        <div class="datebox">{{convertTime(m.DAT[sdx])}}</div>
                        <div v-if="m.STY[sdx-2]" class="staybox">
                            <a :href="m.STY[sdx-2][1]" target="_blank">
                            <i class="fa fa-bed"></i>
                            <span>{{m.STY[sdx-2][0]}}</span>
                            </a>
                        </div>
                        <div v-if="sdx==1" class="flightbox">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <span class="icon"><i class="fa fa-plane"></i></span>
                                <span>{{m.FLI[0].number}}</span>
                            </div><br>
                            <span class="text-b">{{m.FLI[0].departureTime}}</span>
                            <span class="text-a">{{m.FLI[0].departureCode}}</span>
                            <div>{{m.FLI[0].departureNation}} {{m.FLI[0].departureName}}</div>
                            <div style="margin: 10px auto; font-weight: bolder;">
                                <span>{{m.FLI[0].carrier}}</span>
                                <i class="fa fa-angles-down"></i>
                                <span>{{m.FLI[0].model}}</span>
                            </div>
                            <span class="text-b">{{m.FLI[0].arriveTime}}</span>
                            <span class="text-a">{{m.FLI[0].arriveCode}}</span>
                            <div>{{m.FLI[0].arriveNation}} {{m.FLI[0].arriveName}}</div>
                        </div>
                        <template v-for="(d,ddx) in s">
                            <div v-if="d[0]=='tour'||d[0]=='meal'" class="trxbox" :class="d[0]">
                                <a :href="d[4]" target="_blank">
                                <div class="trxbox-left">
                                    <span v-if="d[0]=='tour'&&d[3]" class="icon"><i class="fa" :class="d[3]"></i></span>
                                    <span v-if="d[0]=='meal'" class="icon"><i class="fa fa-utensils"></i></span>
                                    <span>{{d[1]}}</span>
                                </div>
                                <div class="trxbox-right">
                                    <span v-if="d[2][1]">{{d[2][1].toLocaleString()}}</span>
                                    <span v-if="d[2][1]">{{m.ACC[d[2][0]][1]}}</span>
                                </div>
                                </a>
                            </div>
                            <div v-if="d[0]=='trans'" class="transbox">
                                <i class="fa fa-ellipsis-vertical"></i>
                                <span>{{d[1]}}</span>
                            </div>
                        </template>
                        <div v-if="m.STY[sdx-1]" class="staybox">
                            <a :href="m.STY[sdx-1][1]" target="_blank">
                            <i class="fa fa-bed"></i>
                            <span>{{m.STY[sdx-1][0]}}</span>
                            </a>
                        </div>
                        <div v-if="sdx==m.DAT.length-1" class="flightbox">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <span class="icon"><i class="fa fa-plane"></i></span>
                                <span>{{m.FLI[1].number}}</span>
                            </div><br>
                            <span class="text-b">{{m.FLI[1].departureTime}}</span>
                            <span class="text-a">{{m.FLI[1].departureCode}}</span>
                            <div>{{m.FLI[1].departureNation}} {{m.FLI[1].departureName}}</div>
                            <div style="margin: 10px auto; font-weight: bolder;">
                                <span>{{m.FLI[1].carrier}}</span>
                                <i class="fa fa-angles-down"></i>
                                <span>{{m.FLI[1].model}}</span>
                            </div>
                            <span class="text-b">{{m.FLI[1].arriveTime}}</span>
                            <span class="text-a">{{m.FLI[1].arriveCode}}</span>
                            <div>{{m.FLI[1].arriveNation}} {{m.FLI[1].arriveName}}</div>
                        </div>
                    </template>
                    </div>
                </div>
            </div>
            <div v-if="scr == 'money'">
                <div v-for="(p,pdx) in m.ACC" :key="pdx" class="trxbox money">
                    <a>
                    <div class="trxbox-left">
                        <span class="icon"><i class="fa fa-money-bill"></i></span>
                        <span>{{p[0]}} 합계</span>
                    </div>
                    <div class="trxbox-right">
                        <span>{{sumAccounts(pdx).toLocaleString()}} {{p[1]}}</span>
                        <span v-if="pdx">({{(sumAccounts(pdx) * m.UNT[p[1]]).toLocaleString()}}원)</span>
                    </div>
                    </a>
                </div>
                <div id="moneytablebox">
                <table>
                    <template v-for="(s,sdx) in m.SCH">
                        <template v-for="(d,ddx) in s">
                            <tr v-if="d[2] && d[2][1]">
                                <td>{{d[1]}}</td>
                                <td>{{d[2][1].toLocaleString()}}<i class="fa fa-xmark"></i>{{d[2][2]}}</td>
                                <td>
                                    <div><span class="big-number">{{(d[2][1]*d[2][2]).toLocaleString()}}</span> {{d[2][0] ? m.ACC[d[2][0]][1] : '원'}}</div>
                                    <div v-if="d[2][0]">({{((d[2][1]*d[2][2]) * m.UNT[m.ACC[d[2][0]][1]]).toLocaleString()}} 원)</div>
                                </td>
                            </tr>
                        </template>
                    </template>
                </table>
                </div>
            </div>
            <div id="header">
                <div :class="scr=='main' ? 'menu-selec' : ''" @click="scr='main'">일정</div>
                <div>★ T T P ★</div>
                <div :class="scr=='money' ? 'menu-selec' : ''" @click="scr='money'">예산</div>
            </div>
            <div id="back1"></div>
            <div id="back2"></div>
            <div id="back3"></div>
            <div id="back4"></div>
            <div id="back5"></div>
            <div id="back6"></div>
        </main>
    `,
    el: '#screen',
    data: {
        m: {},
        scr: 'main'
    },
    mounted() {
        const masterParse = jsonData
        if (masterParse) {
            this.m = masterParse
        }
        console.log()
    },
    methods: {
        convertTime(str) {
            return moment(str).format('MMM Do (ddd)')
        },
        sumAccounts(pdx) {
            let subtotal = 0
            this.m.SCH.forEach(s => {
                s.forEach(d => {
                    if (d[2] && d[2][0] == pdx) {
                        subtotal += d[2][1] * d[2][2]
                    }
                })
            })
            return subtotal
        }
    }
}

<template>
    <v-container fluid>
        <v-form>
            <v-file-input 
                multiple
                chips 
                v-model="files"
                label="Selecione as legendas" 
                prepend-icon="mdi-message-text"
                append-outer-icon="mdi-send"
                outlined
                @click:append-outer="processSubtitles"
            />
        </v-form>
        <div class="pills">
            <Pill v-for="(word, idx) in groupedWords" :key="idx" :name="word.name" :amount="word.amount" />
        </div>
    </v-container>
</template>

<script>
import { ipcRenderer } from "electron";
import Pill from "./Pill";

export default {
    components:{
        Pill
    },
    data(){
        return {
            files:[],
            groupedWords:[]
        }
    },
    methods:{
        processSubtitles(){
            ipcRenderer.once('process-subtitles', (event, groupedWords) => {
                this.groupedWords = groupedWords;
            });
            ipcRenderer.send('process-subtitles', this.files.map(i => i.path));
        }
    }
}
</script>

<style>
.pills{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
<template>
    <div style="margin-top: 1%; padding-bottom: 2%;">
            Dear Prof Carter,<br/><br/>
            
            Via this e-mail I haha would like to connect with you regarding your research on informatics.<br/>
            I recently started my PhD at the University of London. My research concerns people's use of health informatics data.<br/>
            Through my reading thus far I came across many of your research articles and am interested in testing to what extent your theory on informatics extrapolates to my research. Would you be interested in having a chat about this sometime this or next week?<br/>
            If so, please let me know what times would suit you best.<br/><br/>
            
            <a @click="parentFunction('https://www.google.com')" href="https://www.google.com" target="_blank">click me i am not scam</a>
            
            I look forward to your response.<br/><br/><br/>
            
            
            Best wishes,<br/>
            Joanna Chmiel
            <div class="email-attachment">
                <div class="attachment-icon"></div>
                <div class="attachment-details">
                    <p class="attachment-filename">1.aac</p>
                </div>
                <a @click="parentFunction('https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1')" class="download-link" target="_blank" href="https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1">Download</a> 
            </div>
    </div>

</template>

<script>
    import './styles.css';

    export default {
        props: {
            parentFunction: Function 
        }
    }


</script>

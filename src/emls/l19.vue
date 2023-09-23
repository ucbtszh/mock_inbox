<template>
    <div>
            Dear Prof Carter,<br/><br/>
            
            Via this e-mail I haha would like to connect with you regarding your research on informatics.<br/>
            I recently started my PhD at the University of London. My research concerns people's use of health informatics data.<br/>
            Through my reading thus far I came across many of your research articles and am interested in testing to what extent your theory on informatics extrapolates to my research. Would you be interested in having a chat about this sometime this or next week?<br/>
            If so, please let me know what times would suit you best.<br/><br/>
            
            <a @click="parentFunction" href="https://www.google.com" target="_blank">click me i am not scam</a>
            
            I look forward to your response.<br/><br/><br/>
            
            
            Best wishes,<br/>
            Joanna Chmiel
            <div class="email-attachment">
                <div class="attachment-icon"></div>
                <div class="attachment-details">
                    <p class="attachment-filename">Document.pdf</p>
                </div>
                <a @click="parentFunction" class="download-link" target="_blank" href="https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1">Download</a> 
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
<!-- 
<style>
* {
font-family: arial;
font-size: 12pt;
}

.email-attachment {
    background-color: #f9f9f9;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    display: flex;
    padding: 10px;
    align-items: center;
    margin: 20px;
}

/* Styles for the attachment icon */
.attachment-icon {
    background-image: url('attachment-icon.png'); /* Replace with your icon URL */
    background-size: 32px 32px;
    width: 32px;
    height: 32px;
    margin-right: 10px;
}

/* Styles for the attachment details */
.attachment-details {
    flex-grow: 1;
}

/* Styles for the attachment filename */
.attachment-filename {
    font-weight: bold;
    margin: 0;
    color: #333;
}

/* Styles for the attachment size */
.attachment-size {
    font-size: 12px;
    margin: 0;
    color: #666;
}

/* Styles for the download link */
.download-link {
    background-color: #0072C6;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
    display: inline-block;
}

.download-link:hover {
    background-color: #005ea6;
}

email-attachment-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 100% viewport height */
    overflow: hidden;
    background-color: #f0f0f0; /* Background color for the entire viewport */
}

/* Styles for the email attachment */
.email-attachment {
    background-color: #f9f9f9;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    display: flex;
    padding: 10px;
    align-items: center;
}

</style> -->
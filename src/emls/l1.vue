<template>
  <div style="margin-top: 1%; padding-bottom: 2%">
    Dear A. Jones,<br /><br />

    Attached you will find the invoice for your order dated August 11, 2022.
    Please check the information and transfer the total amount in the next days
    to the account below.<br /><br />

    If the items have not arrived yet, please contact us.<br /><br />

    <table>
      <tr>
        <td>Staff Chair C4</td>
        <td>23,300</td>
      </tr>
      <tr>
        <td>Staff Table Bevel</td>
        <td>79,900</td>
      </tr>
      <tr>
        <td>Mobile Drawer Unit MDU-STD</td>
        <td>16,750</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>119,950</td>
      </tr>
    </table>
    <br /><br /><br />

    Sincerely<br />
    Mechano Service<br /><br /><br /><br />

    <p style="text-align: center">
      Mechano Designer Office Furniture – IBAN: PK24 7889 4568 4784 1546 2214 –
      BIC/SWIFT: MEZNPKKALHR
    </p>
    <br /><br /><br />

    Contact us:<br />
    Phone: 0300-8441060<br />
    Fax: 042-3587-6763<br />
    Email: mechanofurniture@gmail.com<br />
    Email: info@mechanofurniture.com<br /><br />

    <div class="email-attachment">
      <div class="attachment-icon"></div>
      <div class="attachment-details">
        <p class="attachment-filename">Invoice 477856.pdf</p>
      </div>
      <a
        @click="
          parentFunction('https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1')
        "
        class="download-link"
        target="_blank"
        href="https://www.dropbox.com/s/6537i6ryoj0lruy/1.aac?dl=1"
        >Download</a
      >
    </div>
  </div>
</template>

<script>
import "./styles.css";

export default {
  props: {
    parentFunction: Function,
  },
};
</script>

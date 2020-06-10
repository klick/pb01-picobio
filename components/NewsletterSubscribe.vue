<template>
  <div v-cloak class="newsletterSubscribe-container">
    <div class="newsletterSubscribe-containerInner">
      <div class="newletterSubscrive-headline">
        Newsletter
      </div>
      <div class="newletterSubscrive-text">
        Wer, wie, was — wo und wann ?! Der heisseste Kitchen-Gossip aus Zürich direkt in deine Inbox. Jetzt anmelden:
      </div>
      <!-- Begin Mailchimp Signup Form -->
      <div id="mc_embed_signup">
        <form
          id="mc-embedded-subscribe-form"
          action="https://hungerdurst.us20.list-manage.com/subscribe/post?u=57ffcad7c604b98a2f5bf15ed&amp;id=cfbaead04f"
          method="post"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate
        >
          <div id="mc_embed_signup_scroll" class="newsletterSubscribe-formWrapper">
            <div class="mc-field-group newsletterSubscribe-formInputContainer">
              <input
                id="mce-EMAIL"
                type="email"
                value=""
                name="EMAIL"
                placeholder="E-Mail Adresse"
                class="required email newsletterSubscribe-formInput"
              >
            </div>

            <div id="mce-responses" class="clear">
              <div id="mce-error-response" class="response" style="display:none" />
              <div id="mce-success-response" class="response" style="display:none" />
            </div>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input type="text" name="b_7c2007f020fdd30e5953c4895_81192c57a5" tabindex="-1" value="">
            </div>
            <div class="clear newsletterSubscribe-formSubmitWrapper">
              <input id="mc-embedded-subscribe" type="submit" value="Los!" name="subscribe" class="button newsletterSubscribe-formSubmit">
            </div>
          </div>
        </form>
      </div>
      <!--End mc_embed_signup-->
    </div>
  </div>
</template>

<style lang="scss">
.newsletterSubscribe-container {
  background-color: black;
  height: $newsletter-containerHeight-mobile;

  padding-left: $mainContainer-padding;
  padding-right: $mainContainer-padding;
  padding-top: 50px;
  @include mq($from: tablet) {
    height: $newsletter-containerHeight;
    padding-top: 92px;
    padding-left: $mainContainer-padding-tablet;
    padding-right: $mainContainer-padding-tablet;
  }
  @include mq($from: desktop) {
    padding-left: $mainContainer-padding-desktop;
    padding-right: $mainContainer-padding-desktop;
  }
}

.newsletterSubscribe-containerInner {
  height: 100%;
  max-width: 420px;
}

.newsletterSubscribe-formWrapper {
  display: flex;
  flex-direction: row;
  margin-top: 27px;
  @include mq($from: tablet) {
    margin-top: 43px;
  }
  width: 100%;
}

.newsletterSubscribe-formInputContainer {
  flex-grow: 1;
}

.newsletterSubscribe-formInput {
  padding: 0 12px;
  @include typo-text();
  color: #757575;
  border: 2px solid white;
  background-color: black;
  height: 50px;
  width: 100%;
  border-radius: 0; // mobile round corners
}

.newsletterSubscribe-formSubmit {
  @include typo-list-kreis();
  background-color: white;
  border: none;
  height: 50px;
  min-width: 100px;
  padding: 0 12px;
  -webkit-appearance: none; // mobile button styling
  border-radius: 0; // mobile round corners
}

.newsletterSubscribe-formSubmitWrapper {
  margin-left: 8px;
}

.newsletterSubscribe-formSubmit:hover {
  cursor: pointer;
}

.newletterSubscrive-headline {
  color: white;
  @include typo-list-name();
}

.newletterSubscrive-text {
  margin-top: 8px;
  color: white;
  @include typo-text();
}
</style>

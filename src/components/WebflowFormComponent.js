import { $fetch } from "ohmyfetch";

const statusEnum = Object.freeze({
  idle: 0,
  error: 1,
  success: 2,
});

export function WebflowFormComponent(props) {
  return {
    // variables
    actionUrl: null,
    redirectUrl: null,
    status: statusEnum.idle,

    // lifecycle hooks
    mounted(el) {
      // log to the console
      window.console.log("mounted: WebflowFormComponent");

      // get the form element
      const form = el.querySelector("form");

      if (form) {
        // set the action and redirect urls
        this.actionUrl = form.getAttribute("action");
        this.redirectUrl = form.getAttribute("data-redirect");
      } else {
        throw Error("WebflowFormComponent requireds a <form> element!");
      }
    },

    // getters
    get isIdle() {
      return this.status === statusEnum.idle;
    },
    get isError() {
      return this.status === statusEnum.error;
    },
    get isSuccess() {
      return this.status === statusEnum.success;
    },

    // methods
    async submit(event) {
      // prevent the default event
      event.preventDefault();

      // set the status to loading
      this.status = statusEnum.loading;

      // post the form data to the demo api
      const response = await $fetch(this.actionUrl, {
        method: "POST",
        body: props.fields,
      }).catch((error) => {
        this.status = statusEnum.error;
        throw Error(error);
      });

      // redirect on success if the redirectUrl has been set
      if (this.redirectUrl) {
        window.location.assign(this.redirectUrl);
      }

      // call the on success callback
      if (props?.onSuccess && typeof props.onSuccess === "function") {
        props.onSuccess(response);
      }

      // update the status
      this.status = statusEnum.success;
    },
  };
}

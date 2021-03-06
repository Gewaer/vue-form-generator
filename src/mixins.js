import { lowercase, slugify } from "./helpers";
import merge from "lodash/merge";
import zipObject from "lodash/zipObject";

export default {
    filters: {
        lowercase,
        slugify
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        error: {
            required: true
        }
    },
    computed: {
        attributes() {
            const attributes = {
                class: {},
                title: ""
            }

            if (this.item.errorClass) {
                attributes.class[this.item.errorClass] = !!this.error;
            }

            let fieldClass = (this.item.attributes && this.item.attributes.class) || [];
            fieldClass = zipObject(fieldClass, fieldClass);

            return merge(attributes, this.item.attributes || {}, { class: fieldClass });
        }
    },
    created() {
        this.item.value && (this.$parent.value = this.item.value);
    },
    methods: {
        updateValue(event) {
            this.$emit("input", event.target.value);
        }
    }
}

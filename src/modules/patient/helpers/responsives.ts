import { computed } from 'vue';
import { useDisplay } from 'vuetify';

export default function useResponsive() {
    const { smAndDown, mdAndDown, lgAndUp, md, mobile } = useDisplay()

    const title = computed(() => ([
      // { 'text-h5': smAndDown.value, 'text-h4': md.value, 'text-h3': lgAndUp.value }, 'my-4'
      'responsive-font'
    ]))

    const subtitle = computed(() => ([{ 'text-h6': smAndDown.value, 'text-h5': md.value, 'text-h4': lgAndUp.value }, 'my-4']))

    const btnSize = computed((): string => {
        switch (true) {
            case smAndDown.value:
                return 'small'
            case mdAndDown.value:
                return 'default'
            default:
                return 'large'
        }
    })

    return {
        title,
        subtitle,
        btnSize,
        mobile
    }
}

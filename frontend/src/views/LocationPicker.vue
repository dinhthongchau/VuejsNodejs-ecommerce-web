<template>
    <div class='grid md:grid-cols-3 gap-4'>
        <!-- Province Dropdown -->
        <div class='relative p-2' v-click-away='hideProvinceList'>
            <select class='form-select p-2 px-3 border w-[300px]' v-model="selectedProvince"
                @focus="startSearchingProvince">
                <option disabled value="">Tỉnh...</option>
                <option v-for="(province, idx) in filteredProvinces" :key="idx" :value="province">
                    {{ province.name }}
                </option>
            </select>
        </div>

        <!-- District Dropdown -->
        <div class='relative p-2' v-click-away='hideDistrictList'>
            <select class='form-select p-2 px-3 border w-[300px]' v-model="selectedDistrict"
                @focus="startSearchingDistrict" @keyup="searchDistrictOnTyping">
                <option disabled value="">Huyện...</option>
                <option v-for="(district, idx) in filteredDistricts" :key="idx" :value="district">
                    {{ district.name }}
                </option>
            </select>
        </div>

        <!-- Ward Dropdown -->
        <div class='relative p-2' v-click-away='hideWardList'>
            <select class='form-select p-2 px-3 border w-[300px]' v-model="selectedWard" @focus="startSearchingWard">
                <option disabled value="">Xã...</option>
                <option v-for="(ward, idx) in filteredWards" :key="idx" :value="ward">
                    {{ ward.name }}
                </option>
            </select>
        </div>

        <div class="mt-4">
            <p>Địa chỉ đã chọn: {{ selectedLocation }}</p>
        </div>
    </div>
</template>




<script>

import ky from 'ky'
import { directive as vClickAway } from 'vue3-click-away'
import { debounce } from 'ts-debounce'

const BASE_API_URL = 'https://provinces.open-api.vn/api'


export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    watch: {
        resultAll(newVal) {
            this.$emit('update:modelValue', newVal);
        }
    },
    directives: {
        'click-away': vClickAway
    },
    data() {
        return {
            provinceSearch: '',
            provinceListShown: false,
            filteredProvinces: [],
            selectedProvince: null,
            districtSearch: '',
            districtListShown: false,
            filteredDistricts: [],
            selectedDistrict: null,
            wardSearch: '',
            wardListShown: false,
            filteredWards: [],
            selectedWard: null,
            resultAll: ''
        }
    },
    methods: {
        markRequireAll(query) {
            const words = query.split(/\s+/)
            return words.map(w => `+${w}`).join(' ')
        },
        highlightName(item) {
            if (!item.matches) {
                return item.name
            }
            const name = item.name
            const matches = Object.values(item.matches)
            matches.sort((v1, v2) => v1[0] - v2[0])
            const parts = []
            let lastPos = 0
            for (const [s, e] of matches) {
                parts.push(name.slice(lastPos, s))
                parts.push(`<strong>${name.slice(s, e)}</strong>`)
                lastPos = e
            }
            parts.push(name.slice(lastPos))
            return parts.join('')
        },
        async searchDistrict(term, provinceCode) {
            if (this.selectedDistrict && this.selectedDistrict.name === term) {
                return
            }
            const rdata = await ky.get(`${BASE_API_URL}/d/search/`, {
                searchParams: { q: this.markRequireAll(term), p: provinceCode }
            }).json()
            this.filteredDistricts = rdata
        },
        searchDistrictOnTyping: debounce(async function () {
            const term = this.districtSearch.trim()
            if (!term || !this.selectedProvince) {
                return
            }
            await this.searchDistrict(term, this.selectedProvince.code)
        }, 300),
        resetProvince() {
            this.provinceSearch = ''
            this.selectedProvince = null
            this.filteredProvinces = []
            this.provinceListShown = false
        },
        resetDistrict() {
            this.districtSearch = ''
            this.selectedDistrict = null
            this.filteredDistricts = []
            this.districtListShown = false
        },
        resetWard() {
            this.wardSearch = ''
            this.selectedWard = null
            this.filteredWards = []
            this.wardListShown = false
        },
        hideProvinceList() {
            this.provinceListShown = false
        },
        hideDistrictList() {
            this.districtListShown = false
        },
        hideWardList() {
            this.wardListShown = false
        },
        async fetchProvinces() {
            const rdata = await ky.get(`${BASE_API_URL}/p/`).json()
            this.filteredProvinces = rdata
        },
        async fetchDistricts(provinceCode) {
            const rdata = await ky.get(`${BASE_API_URL}/p/${provinceCode}`, { searchParams: { depth: 2 } }).json()
            this.filteredDistricts = rdata.districts
        },
        async fetchWards(districtCode) {
            const rdata = await ky.get(`${BASE_API_URL}/d/${districtCode}`, { searchParams: { depth: 2 } }).json()
            this.filteredWards = rdata.wards
        },
        async searchProvince(term) {
            if (this.selectedProvince && this.selectedProvince.name === term) {
                return
            }
            const rdata = await ky.get(`${BASE_API_URL}/p/search/`, {
                searchParams: { q: this.markRequireAll(term) }
            }).json()
            this.filteredProvinces = rdata
        },
        async searchWard(term, districtCode) {
            if (this.selectedWard && this.selectedWard.name === term) {
                return
            }
            const rdata = await ky.get(`${BASE_API_URL}/w/search/`, {
                searchParams: { q: this.markRequireAll(term), d: districtCode }
            }).json()
            this.filteredWards = rdata
        },
        async startSearchingProvince() {
            this.provinceListShown = true
            if (!this.filteredProvinces.length) {
                await this.fetchProvinces()
            }
        },
        async startSearchingDistrict() {
            this.districtListShown = true
            if (this.filteredDistricts.length || !this.selectedProvince) {
                return
            }
            await this.fetchDistricts(this.selectedProvince.code)
        },
        async startSearchingWard() {
            this.wardListShown = true
            if (this.filteredWards.length || !this.selectedDistrict) {
                return
            }
            await this.fetchWards(this.selectedDistrict.code)
        },
        selectProvince(province) {
            this.hideProvinceList()
            this.selectedProvince = province
            this.provinceSearch = province.name
            this.resetDistrict()
            this.resetWard()
        },
        selectDistrict(district) {
            this.hideDistrictList()
            this.selectedDistrict = district
            this.districtSearch = district.name
            this.resetWard()
        },
        selectWard(ward) {
            this.hideWardList()
            this.selectedWard = ward
            this.wardSearch = ward.name
        }
    },
    computed: {
        selectedLocation() {
            let result = '';
            if (this.selectedProvince) {
                result += this.selectedProvince.name;
            }
            if (this.selectedDistrict) {
                result += `, ${this.selectedDistrict.name}`;
            }
            if (this.selectedWard) {
                result += `, ${this.selectedWard.name}`;
            }
            this.resultAll = result;
            this.$emit('location-changed', this.resultAll); // Phát ra sự kiện khi thay đổi
            return result;
        }
        
    }
  
    
}



</script>


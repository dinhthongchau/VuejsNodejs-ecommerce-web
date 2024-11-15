<template>
    <div class='grid md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4'>
        <div class='relative' v-click-away='hideProvinceList'>
            <input class='p-1 px-2 appearance-none outline-none text-gray-800 border' v-model.trim='provinceSearch'
                placeholder='Tỉnh...' @focus='startSearchingProvince' />
            <div class='absolute z-10 max-h-48 w-full bg-gray-100 overflow-y-auto shadow'
                v-show='provinceListShown && filteredProvinces.length'>
                <ul class='list-none'>
                    <li v-for='(item, idx) in filteredProvinces' :key='idx' v-html='highlightName(item)'
                        class='px-2 py-1 cursor-pointer bg-white hover:bg-blue-100' @click='selectProvince(item)'></li>
                </ul>
            </div>
        </div>
        <div class='relative' v-click-away='hideDistrictList'>
            <input class='p-1 px-2 appearance-none outline-none text-gray-800 border' v-model.trim='districtSearch'
                placeholder='Huyện...' @focus='startSearchingDistrict' @keyup='searchDistrictOnTyping()' />
            <div class='absolute z-10 max-h-48 w-full bg-gray-100 overflow-y-auto shadow'
                v-show='districtListShown && filteredDistricts.length'>
                <ul class='list-none'>
                    <li v-for='(item, idx) in filteredDistricts' :key='idx' v-html='highlightName(item)'
                        class='px-2 py-1 cursor-pointer bg-white hover:bg-blue-100' @click='selectDistrict(item)'></li>
                </ul>
            </div>
        </div>
        <div class='relative' v-click-away='hideWardList'>
            <input class='p-1 px-2 appearance-none outline-none text-gray-800 border' v-model.trim='wardSearch'
                placeholder='Xã...' @focus='startSearchingWard' />
            <div class='absolute z-10 max-h-48 w-full bg-gray-100 overflow-y-auto shadow'
                v-show='wardListShown && filteredWards.length'>
                <ul class='list-none'>
                    <li v-for='(item, idx) in filteredWards' :key='idx'
                        class='px-2 py-1 cursor-pointer bg-white hover:bg-blue-100' @click='selectWard(item)'
                        v-html='highlightName(item)'></li>
                </ul>
            </div>
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
            selectedWard: null
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
            return result;
        }
    }

}



</script>

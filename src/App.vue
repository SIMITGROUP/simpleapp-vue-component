<template>
    <div  style="width:100vw ;display: flex; flex-direction:row ;">
        <SimpleAppForm  :document="person" #default="o">
        <div >
            <!-- basic  -->
            <div class="fieldblock">
                <h3>SimpleAppText</h3>                    
                <SimpleAppValue class="flex flex-col" hidelabel :setting="o.getField(fName)" v-model="data.name">
                    <SimpleAppText :setting="o.getField(fFirstName)" v-model.trim="data.name.firstName" ></SimpleAppText>
                    <SimpleAppText :setting="o.getField(fLastName)" v-model.trim="data.name.lastName"></SimpleAppText>
                </SimpleAppValue> 
                <SimpleAppText type="date" :setting="o.getField(fDob)" v-model.trim="data.dob" description="type=date"></SimpleAppText>
                <SimpleAppText type="email" :setting="o.getField(fEmail)" v-model.trim="data.email" description="type=email"></SimpleAppText>
            </div>
            <div class="fieldblock">
                <h3>SimpleAppNumber</h3>
                <SimpleAppNumber :setting="o.getField(fAge)" v-model.number="data.age"></SimpleAppNumber>        
                <SimpleAppNumber :setting="o.getField(fSalary)" v-model.number="data.salary" :minFractionDigits="2" :maxFractionDigits="2" description="2 decimals"></SimpleAppNumber>                            
            </div>
            <div class="fieldblock">
                    <h3>SimpleAppCalendar</h3>                    
                    <SimpleAppCalendar showIcon @click="console.log('hihi')" :setting="o.getField(fDob)" v-model="data.dob"></SimpleAppCalendar>
            </div>               
            <div class="fieldblock">
                <h3>SimpleAppPassword</h3>                                   
                <SimpleAppPassword  :setting="o.getField(fPassword)" v-model="data.password"></SimpleAppPassword>                    
            </div>                                    
                
            <div class="fieldblock">
                <h3>SimpleAppChip</h3>                    
                <SimpleAppChip  :setting="o.getField(fHobbies)" v-model="data.hobbies"></SimpleAppChip>
            </div>
            
            <div class="fieldblock">
                <h3>Boolean</h3>
                <SimpleAppCheckbox  :setting="o.getField(fIsActive)" v-model="data.isactive" description="SimpleAppCheckbox"></SimpleAppCheckbox>
                <SimpleAppSwitch  :setting="o.getField(fIsActive)" v-model="data.isactive" description="SimpleAppSwitch"></SimpleAppSwitch>
            </div>
            

            <div class="fieldblock">
                <h3>Long text</h3>
                <SimpleAppTextarea  :setting="o.getField(fDescription)" v-model="data.description" description="SimpleAppTextarea"></SimpleAppTextarea>
                <SimpleAppEditor :setting="o.getField(fDescription)" v-model="data.description" description="SimpleAppEditor"></SimpleAppEditor>
            </div>
            <div class="fieldblock">
                <h3>others</h3>
                <SimpleAppSlider  :setting="o.getField(fAge)" v-model="data.age" description="SimpleAppSlider"></SimpleAppSlider>                        
                <SimpleAppColor  :setting="o.getField(fColorGroup)" v-model="data.colorgroup" description="SimpleAppColor"></SimpleAppColor>                                        
                <SimpleAppRating  :setting="o.getField(fQuality)" v-model="data.quality" description="SimpleAppRating"></SimpleAppRating> 
            </div>                
                <!-- <SimpleAppAutocomplete  :setting="o.getField(fHobbies)" v-model="data.hobbies"></SimpleAppAutocomplete> -->                
                <!-- tree -->
                <!-- <SimpleAppCascadeselect  :setting="o.getField(fHobbies)" v-model="data.hobbies"></SimpleAppCascadeselect> -->
                    <!-- tree select allow parent-->
                <!-- <SimpleAppTreeselect  :setting="o.getField(fHobbies)" v-model="data.hobbies"></SimpleAppTreeselect>                
                <SimpleAppAutocomplete  :setting="o.getField(fHobbies)" v-model="data.hobbies"></SimpleAppAutocomplete> -->        
        </div>        
        <div>
            <!-- with list -->
            <!-- <div class="fieldblock">
                <h3>SimpleAppSelect</h3>
                <SimpleAppSelect  :setting="o.getField(fGender)" optionValue="gendervalue" optionLabel="name" v-model="data.gender" description="list from jsonschema 'oneOf'"></SimpleAppSelect>
                <SimpleAppSelect  label="Pick Gender" :setting="o.getField(fGender)" :options="genderlist" v-model="data.gender" description="define list manually"></SimpleAppSelect>                
                <SimpleAppSelect  :setting="o.getField(fBlood)" v-model="data.blood" description="list from jsonschema enum"></SimpleAppSelect>
                <small class="special-comment">* List obtain jsonschema 'enum' or 'oneOf'.</small>
            </div>
            <div class="fieldblock">
                <h3>SimpleAppList</h3>
                 <SimpleAppList  :setting="o.getField(fBlood)" v-model="data.blood" description="list from jsonschema enum"></SimpleAppList>
                 <small class="special-comment">* Configuration similar with SimpleAppSelect</small>
            </div>
            <div class="fieldblock">
                <h3>SimpleAppRadio</h3>                
                <SimpleAppRadio  :setting="o.getField(fBlood)"  v-model="data.blood" :options="genderlist" description="define list manually"></SimpleAppRadio>
                <SimpleAppRadio  :setting="o.getField(fBlood)"  v-model="data.blood" description="list from jsonschema enum"></SimpleAppRadio>
                <small class="special-comment">* Configuration similar with SimpleAppSelect</small>
            </div>
            <div class="fieldblock">
                <h3>SimpleAppSelectmulti</h3>
                <SimpleAppSelectmulti  :setting="o.getField(fSubscribed)"  v-model="data.subscribed" description="list from jsonschema enum"></SimpleAppSelectmulti>
                <SimpleAppSelectmulti  :setting="o.getField(fSubscribed)"  :options="customsubscribelist" optionValue="value" optionLabel="label" v-model="data.subscribed" description="define list object manually"></SimpleAppSelectmulti>
                <SimpleAppSelectmulti  :setting="o.getField(fLanguages)"   optionValue="value" optionLabel="label" v-model="data.languages" description="list from jsonschema anyOf"></SimpleAppSelectmulti>                
                <small class="special-comment">* List obtain jsonschema 'enum' or 'anyOf'.</small>
            </div>
            <div class="fieldblock">
                <h3>SimpleAppListmulti</h3>                    
                <SimpleAppListmulti  :setting="o.getField(fSubscribed)"  v-model="data.subscribed" description="list from jsonschema enum"></SimpleAppListmulti>
                <small class="special-comment">* Configuration similar with SimpleAppSelectMulti.</small>
            </div> -->
            
            <div class="fieldblock">
                <h3>Remote Autocomplete (single)</h3>{{ data }}
                <SimpleAppAutocomplete  :setting="o.getField(fSalesAgent)" 
                        :optionLabel="autocompletelabel" v-model="data.salesagent"
                        @complete="search" :suggestions="autocompleteoptions"
                        />
                
            </div>
            <!-- <div class="fieldblock">
                <h3>Remote Autocomplete (multiple)</h3>
                <SimpleAppAutocompletemulti  :setting="o.getField(fKids)" 
                        optionLabel="name" v-model="data.kids"
                        @complete="searchKids" :suggestions="autocompletekids"
                        />
            </div>
             -->
            
                   
        </div>
        <div >   
            <button @click="person.addEmptyAddress">Add Address</button>         
            <SimpleAppDatatable @row-dblclick="editRow"  v-model="data.addresses" :setting="o.getField(fAddress)" :columns="['stid','postcode','street']"/>
        </div>
        </SimpleAppForm>
        
    </div>
    
    <div class="person-result">
        <h3>simpleapp data</h3>
            <pre>{{data}}</pre>
    </div>
    
  <div>
      <button @click="create()">Create</button>
      <button @click="person.update()">Update</button>
      <button @click="person.delete(data._id??'')">Delete</button>
  </div>

</template>
<script setup lang="ts">
import {PersonDoc} from './server/docs/PersonDoc'
import {ref} from 'vue'
import type{Ref} from 'vue'
import SimpleAppForm from './components/SimpleAppForm.vue'
import SimpleAppValue from './components/SimpleAppValue.vue'
import SimpleAppText from './components/SimpleAppText.vue'
import SimpleAppNumber from './components/SimpleAppNumber.vue'
import SimpleAppChip from './components/SimpleAppChip.vue'
import SimpleAppCalendar from './components/SimpleAppCalendar.vue'
import SimpleAppAutocomplete from './components/SimpleAppAutocomplete.vue'
import SimpleAppAutocompletemulti from './components/SimpleAppAutocompletemulti.vue'
import SimpleAppCheckbox from './components/SimpleAppCheckbox.vue'
import SimpleAppSwitch from './components/SimpleAppSwitch.vue'
import SimpleAppColor from './components/SimpleAppColor.vue'
import SimpleAppRating from './components/SimpleAppRating.vue'
import SimpleAppTextarea from './components/SimpleAppTextarea.vue'
import SimpleAppSlider from './components/SimpleAppSlider.vue'
import SimpleAppRadio from './components/SimpleAppRadio.vue'
import SimpleAppPassword from './components/SimpleAppPassword.vue'
import SimpleAppEditor from './components/SimpleAppEditor.vue'
import SimpleAppSelect from './components/SimpleAppSelect.vue'
import SimpleAppSelectmulti from './components/SimpleAppSelectmulti.vue'
import SimpleAppList from './components/SimpleAppList.vue'
import SimpleAppListmulti from './components/SimpleAppListmulti.vue'
import SimpleAppDatatable from './components/SimpleAppDatatable.vue'

const autocompletelabel='label'
const errmsg = ref<any>()
const msg = ref<any>()
const person = new PersonDoc()
const data = person.getReactiveData()
const fName = '#/properties/name'
const fEmail = '#/properties/email'
const fFirstName='#/properties/name/properties/firstName'
const fLastName='#/properties/name/properties/lastName'
const fAge='#/properties/age'
const fDob='#/properties/dob'
const fGender='#/properties/gender'
const fBlood='#/properties/blood'
const fHobbies ='#/properties/hobbies'
const fIsActive = '#/properties/isactive'
const fColorGroup = '#/properties/colorgroup'
const fQuality = '#/properties/quality'
const fDescription = '#/properties/description'
const fSubscribed = '#/properties/subscribed'
const fGroup = '#/properties/group'
const fSalary = '#/properties/salary'
const fPassword = '#/properties/password'
const fLanguages='#/properties/languages'
const fSalesAgent ='#/properties/salesagent'
const fKids='#/properties/kids'
const fAddress='#/properties/addresses'
const genderlist = ["","M","F","Others"]
// const bloodlist = ["","A","B","AB","O","Others"]
const customsubscribelist = [
    {value:'Sports',label:'Sports'},
    {value:'Entertainment',label:'Entertainment'},
    {value:'Movie',label:'Movie'},
    {value:'Drama',label:'Drama'},
    {value:'News',label:'News'},
    {value:'Others',label:'Others'},
]
// :options="[{value:1,label:'hi'},{value:2,label:'ok'},{value:3,label:'no'}]"   optionValue="value" optionLabel="label"
const editRow=(event:any)=>{
    console.log(event.data,event.index)
}
const create=()=>{
    console.log("Create")
    person.create().then((res)=>{
        msg.value= res.data
        errmsg.value=''
        console.log("result",res)
    }).catch((res)=>{
        msg.value=''
        errmsg.value= res
        console.log("result",res)
    })
}
const autocompleteoptions = ref<any[]>()
const search = (e:any)=>{
    console.log(e)
    let list:any[] = []
    for(let i=0;i<10;i++){
        let tmp:any={}
        tmp['id']=i
        tmp[autocompletelabel]=`${e.query}-${i}`
        list.push(tmp)
        //
    }
    autocompleteoptions.value=list
    console.log(autocompleteoptions.value)
}

const autocompletekids =ref<any[]>([])
const searchKids = (e:any)=>{
    console.log("search kids")
    
    let list:any[] = []
    for(let i=0;i<10;i++){
        list.push({ic:i,name: `${e.query}-${i}`})
        //
    }
    autocompletekids.value=list
}
</script>

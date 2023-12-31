/**
 * This file was automatically generated by simpleapp generator.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and regenerate this file.
 */

import {SimpleAppClient} from '../../SimpleAppClient'
// import { JSONSchema7 } from 'json-schema';
import { Configuration, PERSONApi } from '../openapi';
import type { Person, PersonName } from '../openapi';
// import {Person} from '../openapi'
export class PersonDoc extends SimpleAppClient<Person, PERSONApi> {
  public readonly schema = {
    type: 'object',
    required:['name'],
    properties: {
      name: {
        type: 'object',
        required:['lastName'],
        properties: {
          firstName: { type: 'string', examples: ['my'] },
          lastName: { type: 'string', examples: ['name'],minLength:3 },
        },
      },
      isactive:{type:'boolean',examples:[true]},
      age: { type: 'integer', examples: [2222] },
      email: { type: 'string', examples: ['myname@a.com'], format: 'email' },
      dob: { type: 'string', examples: ['2023-08-15'], format: 'date' },
      gender:{ type:'string',oneOf:[{gendervalue:'',name:'Unknown'},{gendervalue:'F',name:'Female'},{gendervalue:'M',name:'Male'}]},
      blood:{ type:'string',enum:['','A','B','AB','O']},
      subscribed:{type:'array',items:{ type:'string',enum:['Sports','News','Entertainment','Drama'],examples:['Drama','News']}},
      languages:{type:'array',items:{ type:'string',anyOf:[{value:'en',label:'English'},{value:'cn',label:'Chinese'},{value:'my',label:'Malay'},{value:'tm',label:'Tamil'}]}},
      description:{type:'description'},
      colorgroup:{ type:'string',format:'color'},
      salary:{type:'number',format:'currency'},
      password:{type:'string',format:'password'},
      quality:{type:'integer'},
      salesagent:{type:'object',format:'autocomplete:getsalesagent',properties:{id:{type:'string'},name:{type:'string'}}},
      kids:{type:'array',items:{type:'object', properties:{ic:{type:'string'},name:{type:'string'}}}  },
      group:{type:'string'},
      hobbies: {
        type: 'array',
        items: { type: 'string', examples: ['golf', 'movie', 'dance'] },
      },
      addresses: {
        type: 'array',
        items: {
          type: 'object',
          required: ['stid', 'street', 'postcode', 'updated'],
          properties: {
            stid: { type: 'string', examples: ['695.3939499698714'] },
            street: {
              type: 'object',
              required: ['st1', 'st2'],
              properties: {
                st1: { type: 'string', examples: ['st1'] },
                st2: { type: 'string', examples: ['st2'] },
              },
            },
            postcode: { type: 'integer', examples: [232323] },
            updated: {
              type: 'string',
              format: 'date',
              examples: ['2000-01-01'],
            },
          },
        },
      },
      _id: { type: 'string', examples: [''] },
      doctype: { type: 'string', examples: ['Person'] },
    },
  };

  constructor() {
    const apiconfig = new Configuration({ basePath: 'http://localhost:8000' });
    const apiobj = new PERSONApi(apiconfig);
    super(apiobj,'pes','person');

    this.setNew();
  }
  setNew = () => {
    const newdata = {
      name: <PersonName>{},
      isactive: true,

      age: 0, //else object

      email: '',
      description:'long desc',
      dob: '2000-12-31',
      gender: 'F',
      blood:'O',
      colorgroup:'',
      quality:3,
      group:'',
      subscribed:['News','Drama'],
      languages:['en'],
      hobbies: ['hihi','bobo'], //typeof field == array
      salary: 2400.00,
      addresses: [], //typeof field == array
      salesagent:{},
      kids:[{ic:"99-00",name:"ali"},{ic:"55-88",name:"baba"}],
      password:'',
      _id: '',

      doctype: '',
    };
    this.setData(newdata);
    
  };

  /*****************************customized frontend + backend code*****************************************/

  //<begin-bothend-code>
  hook = (type: string, data: Person): boolean => {
    if (type == 'pre-validation') {
      console.log('person save hook');
      const dob = new Date(data.dob).getFullYear();
      const today = new Date().getFullYear();
      const different = today - dob;
      data.age = different;
    }

    return true;
  };

  addEmptyAddress = () => {
    
    const stid: string = (Math.random() * 10000).toString();
    const add = {
      stid: stid,
      street: { st1: 'st1', st2: 'st2' },
      postcode: 232323,
      updated: '2000-01-01',
    };
    this.getData().addresses.push(add);
  };
  deleteAddress = (index: number) => {
    this.getData().addresses.splice(index, 1);
  };
  //<end-bothend-code>
  /*****************************customized frontend only code*****************************************/
}

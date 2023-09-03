
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { AxiosResponse } from 'axios';
// import { useToast, } from 'primevue/usetoast';
// import type {  ToastMessageOptions } from 'primevue/toast';
// const toast = useToast();

type crudType = {
  runFindOne: Function;  
  runCreate: Function;
  runUpdate: Function;
  runList: Function;
  runDelete: Function;
};
export class SimpleAppClient<
  TData extends { _id?: string },
  TApi extends crudType,
> {
  protected defaultTimeOut=5000
  protected docapi;
  public event:Function|null=null;
  public listen:Function|null=null;
  protected data = <Ref<TData>>ref({} as TData);
  public schema = {}; //cant define data type, cause it make autocomplete gone.
  protected doctype = '';
  protected docname = '';
  protected errorlist = ref({});
  constructor(apiobj: TApi,doctype:string,docname:string) {
    this.docapi = apiobj;
    this.doctype=doctype
    this.docname = docname
  }
  getDocType = () => this.doctype;
  getDocName = () => this.docname;
  setNew = ()=>{}
  setSchema = (schema: any) => (this.schema = schema);
  getSchema = () => this.schema;
  getErrors = () => this.errorlist;
  getData = () => this.data.value;
  getApi = () =>this.docapi;
  getReactiveData = () => this.data;
  setData = (data: any) => {
    // this.data.value = data;
    Object.assign(this.data.value, data);
  };
  
  async getById(id: string) {
    return await this.docapi.runFindOne(id,{timeout:this.defaultTimeOut})
    .then((res: AxiosResponse) => {
      if(this.event){this.event('success:getById',res.data)}
      Object.assign(this.data.value, res.data);
      return res;
    }).catch((res:any)=>{
      if(this.event){this.event('error:getById',res);return res}
    });
  }
  async create() {
    const errors = this.validateFailed();
    if (errors) {
      if(this.event){this.event('error:create',errors)}      
      return await Promise.reject(errors);
    } else {
      return await this.docapi
        .runCreate(this.data.value,{timeout:this.defaultTimeOut})
        .then((res: AxiosResponse) => {
          if(this.event){this.event('success:create',res.data);return res.data}
          this.data.value = { ...res.data };
          return res;
        }).catch((errors:any)=>{
          if(this.event){this.event('error:create',errors)}
          console.error(errors)
          return errors
        });
    }
  }
  async update() {
    const recordid: string = this.data.value._id ?? '';
    const errors = this.validateFailed();
    if (errors) {
      if(this.event){this.event('error:update',errors)}
      console.error(errors)
      return await Promise.reject(errors);
    } else {
      return await this.docapi
        .runUpdate(recordid, this.data.value,{timeout:this.defaultTimeOut})
        .then((res: AxiosResponse) => {
          if(this.event){this.event('success:update',res.data)}
          return res.data;
        }).catch((errors:any)=>{
          if(this.event){this.event('error:update',errors)}
          console.error(errors)
        });
    }
  }
  async delete(id: string) {
    return await this.docapi.runDelete(id,{timeout:this.defaultTimeOut})
      .then((res:AxiosResponse)=>{
        if(this.event){this.event('success:delete',res.data)}
        return res.data
      }).catch((errors:any)=>{
        if(this.event){this.event('error:delete',errors)}
        console.error(errors)
        return errors
      });
  }
  async list() {
    return await this.docapi.runList({timeout:this.defaultTimeOut})
        .then((res:AxiosResponse)=>{
          if(this.event){this.event('info:listready',res.data);}
          return res.data
        }).catch((res:any)=>{
          if(this.event){this.event('error:list',res)}
          return res
        });
  }
  find() {}
  hook(type: string, data: TData) {
    console.log('internal save hook');
    return true;
  }
  validateFailed() {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    ajv.addFormat('field-autocomplete-code', /.*$/)
    ajv.addFormat('field-autocomplete-name', /.*$/)
    ajv.addKeyword({
      keyword:'x-foreignkey',
      type:'string'
    });
    this.errorlist.value = {};
    this.hook('pre-validation', this.data.value);
    const validate = ajv.compile(this.schema);
    const valid = validate(this.data.value);
    if (!valid) {
      const errors = validate.errors;
      const tmp: { [key: string]: any } = {};
      if (errors) {
        for (let i = 0; i < errors?.length; i++) {
          const key: string = errors[i]['instancePath'];
          if (!tmp[key]) {
            tmp[key] = [];
          }
          tmp[key].push(errors[i]);
        }
      }
      // console.error(tmp);
      this.errorlist.value = tmp;
      // console.error(this.errorlist);

      return validate.errors;
    } else {
      this.hook('post-validation', this.data.value);
      return false;
    }
  }
}

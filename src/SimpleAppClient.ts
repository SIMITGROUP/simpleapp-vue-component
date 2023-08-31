
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { AxiosResponse } from 'axios';

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
  protected docapi;
  protected data = <Ref<TData>>ref({} as TData);
  public schema = {}; //cant define data type, cause it make autocomplete gone.
  protected doctype = '';
  protected errorlist = ref({});
  constructor(apiobj: TApi) {
    this.docapi = apiobj;
  }
  setDocType = (doctype: string) => (this.doctype = doctype);
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
    return await this.docapi.runFindOne(id).then((res: AxiosResponse) => {
      // this.data.value = { ...res.data };
      Object.assign(this.data.value, res.data);
      return res;
    });
  }
  async create() {
    const errors = this.validateFailed();
    if (errors) {
      return await Promise.reject(errors);
    } else {
      return await this.docapi
        .runCreate(this.data.value)
        .then((res: AxiosResponse) => {
          this.data.value = { ...res.data };
          return res;
        });
    }
  }
  async update() {
    const recordid: string = this.data.value._id ?? '';
    const errors = this.validateFailed();
    if (errors) {
      return await Promise.reject(errors);
    } else {
      return await this.docapi
        .runUpdate(recordid, this.data.value)
        .then((res: AxiosResponse) => {
          return res;
        });
    }
  }
  async delete(id: string) {
    return await this.docapi.runDelete(id);
  }
  async list() {
    return await this.docapi.runList();
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
    ajv.addFormat('autocomplete', /.*$/)
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


describe('Testing products',()=>{
    let chail;
    let expect;
    const productRepositori = 'productosssss';
    before(async function (){
       let chai = await import('chai');
       let expect = chai.expect;
       const app = require('../app'); 
        // se ejecuta una unica vez antes de todos los test 
        this.timeout(10000);
        chai.request(app)
      .get('/profile/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done(); });
    })
})
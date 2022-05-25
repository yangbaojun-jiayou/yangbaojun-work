// 声明类
class Problem{
// 实例化类自动调用
constructor(){
// 6,数据添加模块
// 6.1,获取保存按钮,绑定点击事件;
this.$('.save-data').addEventListener('click',this.saveData);
// 7.1.2给tbody绑定点击事件;利用事件委托,将所有的子元素点击事件,都委托给它;
// 节点事件的回调方法的this指向当前节点对象;
// bind()  返回一个新的函数引用,改变其内部this指向;
this.$('.table tbody').addEventListener('click',this.distribute.bind(this));
this.getDate();
// 7.1.7给模态框的确认删除按钮绑定事件
this.$('.confirm-del').addEventListener('click',this.confirmDel.bind(this));
// 7.3 给修改按钮的模态框确认按钮绑定点击事件;
this.$('.modify-data').addEventListener('click',this.saveModify.bind(this));

}

/******tbody点击回调函数********/ 
distribute(eve){
// console.log(eve);
// 7.1.3获取事件源
// console.log(this);
let tar=eve.target;
// 7.1.4判断按钮上是否有指定类,确定当前点击的是什么按钮;
// 删除的button上 绑定的是 btn-del;
// 修改的button上 绑定的是 bth-modify
// console.log(tar.classList.contains('btn-del'));
// 7.1.5判断点击的是否为删除按钮;是则调用删除的方法
if(tar.classList.contains('btn-del')) this.delDate(tar);
// 7.2.1 判断点击的是否为修改按钮,是则调用修改的方法;
if(tar.classList.contains('btn-modify')) this.modifyData(tar);
}
/**********修改的方法***********/ 

// 7.2.4 将修改数据的id,隐藏到修改的模态框中;
// 7.2.5 获取表单中数据,不为空则发送给后台
// 7.2.6 刷新页面
modifyData(target){
  // console.log('我是修改');
  // console.log(target);
  // 7.2.2 弹出修改的模态框,通过js控制;
  $('#modifyModal').modal('show')
// 7.2.3 获取要修改的数据呈现在模态框中;
let trObj='';
if(target.nodeName=='SPAN'){
  trObj=target.parentNode.parentNode.parentNode;
}
if(target.nodeName=='BUTTON'){
  trObj=target.parentNode.parentNode;
}
// console.log(trObj);
// 7.2.4 获取所有子节点,分别取出id idea title post;
let chil=trObj.children;
// console.log(chil);
let id=chil[0].innerHTML;
let title=chil[1].innerHTML;
let post=chil[2].innerHTML;
let idea=chil[3].innerHTML;
// console.log(id,title,post,idea);
// 7.2.5 将获取的内容放到修改的表格中;
let from=this.$('#modifyModal form').elements; 
// console.log(from);
from.title.value=title;
from.pos.value=post;
from.idea.value=idea;
// 7.2.6 将id设置为属性
this.modifyId=id;
}
/******7..3  修改模态框确认按钮点击事件*******/
saveModify(){
// console.log(this.modifyId,2222);
// 7.3.1 收集修改框中的表单数据;
let form=this.$('#modifyModal form').elements;
// console.log(form);
// let title=form.title.value.trim();
// let idea=form.idea.value.trim();
// let post=form.pos.value.trim();
// console.log(title,idea,post);

// 7.3.2 解构赋值
let {title,pos,idea}=this.$('#modifyModal form').elements;
// console.log(title,idea,pos);
 let titleVal=form.title.value.trim();
 let ideaVal=form.idea.value.trim();
 let posVal=form.pos.value.trim();
//  console.log(titleVal,ideaVal,posVal);
// 7.3.5 判断数据不能为空
if(!titleVal ||!ideaVal||!posVal) return;
// 7.3.3 给后台发送数据,进行修改
axios.patch('http://localhost:3000/posts/'+this.modifyId,{
  title:titleVal,
  idea:ideaVal,
  post:posVal
}).then(res=>{
  // console.log(res);
// 7.3.4 判断页面是否请求成功,请求成功刷新页面;
if(res.status==200){
location.reload();
}

})

}


/********删除数据的方法*********/
delDate(target){
//  console.log('我是删除.....');
// 7.1.8 将当前准备删除的节点保存到属性上;
this.target=target;
// 7.1.6弹出确认删除的模态框,通过js控制;
// $()是jquery的方法,不用加this;
$('#delModal').modal('show')


} 
/******确认删除的方法********/ 
confirmDel(){
// console.log(this.target.nodeName);
// 7.1.9 确认点击的是审判还是button;
// 7.1.10 获取ID
let id=0;
if(this.target.nodeName=='SPAN'){
// parentNode 属性可返回某节点的父节点。如果指定的节点没有父节点则返回 null 。
  let trObj=this.target.parentNode.parentNode.parentNode;
  // console.log(trObj);
  id=trObj.firstElementChild.innerHTML;
}
if(this.target.nodeName=='BUTTON'){
  // parentNode 属性可返回某节点的父节点。如果指定的节点没有父节点则返回 null 。
    let trObj=this.target.parentNode.parentNode;
    // console.log(trObj);
    id=trObj.firstElementChild.innerHTML; 
  }
  // console.log(id);
// 7.1.11 将id发送给json-server服务器,删除对应的数据,并刷新页面;
axios.delete('http://localhost:3000/posts/'+id).then(res=>{
  // console.log(res);
// 7.1.12 判断刷新是否成功,成功则刷新页面;
if(res.status==200){
location.reload();
}
});

// console.log('确认删除了....'); 
}
//6.1.0保存数据的方法
saveData(){
// this为什么指向当前节点对象?-----事件源
// console.log(this);
// 6.1.1 获取添加表单
// elements 集合以数组形式返回 form 表单所有的元素。
let form=document.forms[0].elements;
// console.log(form);
// 6.1.2获取添加表单中的值;
let title=form.title.value.trim();
let post=form.post.value.trim();
let idea=form.idea.value.trim();
// console.log(title,post,idea);
// 6.1.3判断添加表单每一项是否有值;如果为空则提示;
if(!title||!post||!idea ){
    // console.log(1111);
throw new Error('表单不能为空....')
}
// 6.1.4将数据通过ajax,发送给json-werver 服务器,进行保存;
// json-server中,post请求是添加数据的;
axios.post('http://localhost:3000/posts', {
title,
post,
idea
}).then(res=>{
    // console.log(res);
//6.1.5如果添加成功则刷新页面;
if(res.status==201){
// 页面刷新的方法
location.reload();   
}
})

} 

/*******获取数据的方法*********/ 
getDate(){
    // console.log('这是数据获取.....');
// 获取tbody,页面中只有一个符合条件,返回单个节点对象;
// let tbody=this.$('tbody');
// console.log(tbody);
// 获取div,页面中有多个div,返回节点集合;
// let div=this.$('div');
// console.log(div);

// 1,发送ajax请求,获取数据;
axios.get('http://localhost:3000/posts')
  .then(res=>{
//    console.log(data);
// 2,获取返回值中的data和status
// console.log(res);
let {data, status}=res;
// console.log(data,status);

//3,当状态为200时,表示请求成功;
if(status==200){
    // console.log(data);
// 4,将获取的数据,渲染到页面当中;
let html='';
data.forEach(ele => {
//   console.log(ele);
//7,操作模块
// 7.2 数据的修改
// 7.1 数据的删除 
// 7.1.1 删除数据的思路
/*
1,删除的第一种思路,直接给行内绑定事件,但是回
<button type="button" class="btn btn-danger btn-sm" onclick="Problem.delDate()">
  <span class="glyphicon glyphicon-trash" aria-hidden="true" ></span>
  </button>
// 静态方法是属于类的;
static delDate(){
    console.log(1111);
}
2,使用事件委托,将删除和修改操作的点击事件,委托给tbody
*/ 
  html+=`<tr>
  <th scope="row">${ele.id}</th>
  <td>${ele.title}</td>
  <td>${ele.post}</td>
  <td>${ele.idea}</td>
  <td>
  <button type="button" class="btn btn-danger btn-xs btn-del">
  <span class="glyphicon glyphicon-trash btn-del" aria-hidden="true" ></span>
  </button>
  <button type="button" class="btn btn-info btn-xs btn-modify">
  <span class="glyphicon glyphicon-wrench btn-modify" aria-hidden="true "></span>
  </button>
  </td>
</tr>`;
});
// console.log(html);
// 5,将拼接出的tr追加到页面中;
this.$('tbody').innerHTML=html;
}
  });

}

/*******获取节点的方法*********/ 
$(ele){
let res =document.querySelectorAll(ele);
// 判断当前页面只有一个符合条件的,就返回单个节点对象,否则返回节点集合;
return res.length==1 ? res[0] : res;
}
}
new Problem; 


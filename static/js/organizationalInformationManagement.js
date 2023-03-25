let bodyTop = document.getElementsByClassName("bodyTop");
let originalName = document.getElementById("originalName");
let changeId = document.getElementById("changeId");
// 取消
function cancel(event) {
  event.parentElement.parentElement.parentElement.style.display = "none";
}
// 新增
function addBoxShow() {
  bodyTop[0].style.display = "block";
  addOrganizeName.value = "";
}
// 将修改的盒子显现
function changeBoxShow(event) {
  bodyTop[1].style.display = "block";
  changeName.value = "";
  originalName.innerHTML = event.parentElement.lastElementChild.innerHTML;
  changeId.innerHTML = event.parentElement.firstElementChild.innerHTML;
}
// 删除组织
function deleteFn(event) {
  swal(
    {
      title: "你确定？",
      text: "要删除",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnConfirm: false,
      closeOnCancel: false,
    },
    function (isConfirm) {
      if (isConfirm) {
        // 发送请求
        axios({
          method: "POST",
          url: "/admin/deleteOrganization",
          data: {
            ids: event.parentElement.firstElementChild.innerHTML,
          },
        })
          .then((result) => {
            // console.log(result.data)
            if (result.data.msg.msg == "OK") {
              swal("删除成功");
              getAllOrganize();
              return;
            }
            swal(result.data.msg.msg);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal("已取消");
      }
    }
  );
}

let contentConten = document.getElementsByClassName("contentConten");
// 获取所有信息(第几页，一页几条，限制条件的对象)
function getAllOrganize(page, perPage, obj) {
  axios({
    method: "POST",
    url: "/admin/showAdmin",
  })
    .then((result) => {
      console.log(result.data);
      contentConten[0].innerHTML = "";
      let str = "";
      for (let i = 0; i < result.data.msg.data.length; i++) {
        str += `
               <ul>
                    <li>${result.data.msg.data[i].name}</li>
                    <li>${i + 1}</li>
                    <li>
                        <div class="" style="display: none;">${
                          result.data.msg.data[i].id
                        }</div>
                        <button onclick="changeBoxShow(this)">修改</button>
                        <button onclick="deleteFn(this)">删除</button>
                        <div class="" style="display: none;">${
                          result.data.msg.data[i].name
                        }</div>
                    </li>
                </ul>
               `;
      }
      contentConten[0].innerHTML = str;
    })
    .catch((err) => {
      console.log(err);
    });
}

getAllOrganize();

// 确定修改
let sureChange = document.getElementById("sureChange");
let changeName = document.getElementById("changeName");
sureChange.onclick = function () {
  if (
    changeName.value == "" ||
    changeName.value.replace(/(^\s*)|(\s*$)/g, "") == ""
  ) {
    swal("请输入组织名(不能为纯空格)");
    return;
  }
  let obj = {
    id: changeId.innerHTML,
    level: -1,
    name: changeName.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
  };
  axios({
    method: "POST",
    url: "/admin/updateOrganization",
    data: {
      obj: obj,
    },
  })
    .then((result) => {
      // console.log(result.data)
      bodyTop[1].style.display = "none";
      getAllOrganize();
      if (result.data.msg.data == "success") {
        swal("修改成功");
        return;
      }
      swal(result.data.msg.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};
// 添加
let sureAdd = document.getElementById("sureAdd");
let addOrganizeName = document.getElementById("addOrganizeName");
sureAdd.onclick = function () {
  if (
    addOrganizeName.value == "" ||
    addOrganizeName.value.replace(/(^\s*)|(\s*$)/g, "") == ""
  ) {
    swal("请输入组织名(不能为纯空格)");
    return;
  }
  let obj = {
    level: -1,
    name: addOrganizeName.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    super_id: 0,
  };
  axios({
    method: "POST",
    url: "/admin/organization.add",
    data: {
      obj: obj,
    },
  })
    .then((result) => {
      // console.log(result.data)
      bodyTop[0].style.display = "none";
      if (result.data.msg.data == "success") {
        swal("添加成功");
        getAllOrganize();
        return;
      }
      swal(result.data.msg.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};

function subject() {
  document.querySelector('#subject').innerHTML = `
    <header>
        <h1>WEB</h1>
         Hello, WEB!!
     </header>`;
}

function TOC() {
  let state = store.getState();
  let i = 0;
  let liTags = '';
  while (i < state.contents.length) {
    liTags =
      liTags +
      `
        <li>
          <a onclick="
            event.preventDefault();
            let action = {type:'SELECT', id:${state.contents[i].id}, mode:'read'}
            store.dispatch(action);" 
            href="${state.contents[i].id}">${state.contents[i].title}</a>
        </li>`;
    i = i + 1;
  }
  document.querySelector('#toc').innerHTML = `
    <nav>
      <ol>
        ${liTags}
      </ol>
    </nav>`;
}

function control() {
  document.querySelector('#control').innerHTML = `
    <ul>
      <li><a onclick="
            event.preventDefault();
            store.dispatch({
              type:'CHANGE_MODE',
              mode:'create'
            });" 
            href="/create">create</a></li>
      <li><input onclick="
            store.dispatch({
              type:'DELETE'
            });" 
            type="button" value="delete"/></li>
    </ul>`;
}

function article() {
  let state = store.getState();
  if (state.mode === 'welcome') {
    document.querySelector('#article').innerHTML = `
    <article>
      <h2>Welcome</h2>
      Hello!!!!!!!
    </article>`;
  } else if (state.mode === 'create') {
    document.querySelector('#article').innerHTML = `
    <article>
      <form onsubmit="
        event.preventDefault();
        let _title = this.title.value;
        let _desc = this.desc.value;
        store.dispatch({
          type:'CREATE',
          title:_title,
          desc:_desc
         })
      ">
        <p>
          <input type="text" name="title" placeholder="title">
        </p>
        <p>
          <textarea name="desc" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    </article>
    `;
  } else if (state.mode === 'read') {
    let i = 0;
    let aTitle, aDesc;
    while (i < state.contents.length) {
      if (state.contents[i].id === state.selected_id) {
        aTitle = state.contents[i].title;
        aDesc = state.contents[i].desc;
        break;
      }
      i = i + 1;
    }
    document.querySelector('#article').innerHTML = `
      <article>
        <h2>${aTitle}</h2>
        ${aDesc}
      </article>`;
  }
}

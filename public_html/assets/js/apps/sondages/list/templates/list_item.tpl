<td><%- title %></td>
<td><%- body_sondage %></td>
<td><%- typeStr %></td>
<td><% if (publish == 1) {%>Oui<% } else {%>Non<%}%></td>
<td>
    <a href="#sondages/<%- _id %>" class="btn btn-small js-compose">
        <i class="icon-eye-open"></i>
        Composer
    </a>
    <a href="#sondages/<%- _id %>/showUsers" class="btn btn-small js-showUsers">
        <i class="icon-user"></i>
        Aperçu
    </a>
    <a href="#sondages/<%- _id %>/edit" class="btn btn-small js-edit">
        <i class="icon-pencil"></i>
        Modifier
    </a>
    <button class="btn btn-small js-delete">
        <i class="icon-remove"></i>
        Supprimer
    </button>
    <button class="btn btn-small js-publish">
        <i class="<% if (publish == 1) {%>icon-ok-sign<% } else {%>icon-remove-sign<%}%>"></i>
        Publier
    </button>
</td>
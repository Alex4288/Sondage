<form>
    <div class="control-group">
        <label for="sondage-title" class="control-label">Titre:</label>
        <input id="sondage-title" name="title" type="text" value="<%- title %>"/>
    </div>
    <div class="control-group">
        <label for="sondage-body_sondage" class="control-label">Corps du Sondage:</label>
        <input id="sondage-body_sondage" name="body_sondage" type="text" value="<%- body_sondage %>"/>
    </div>
    <div class="control-group" id="type-sondage-region">
        <label for="sondage-type_sondage" class="control-label">Type de Sondage:</label>
        <select id="sondage-type_sondage" name="type_sondage" value="<%- type_sondage %>">
            <option value="1"> Une Réponse Possible. </option>
            <option value="2"> Plusieurs Réponses Possibles. </option>
            <option value="3"> Quantitatif. </option>
        </select>
    </div>
    <div class="control-group">
        <label for="sondage-publish" class="control-label">Publier:</label>
        <input id="sondage-publish" name="publish" type="text" value="<%- publish %>"/>
    </div>
    <button class="btn js-submit">Sauvegarder</button>
</form>

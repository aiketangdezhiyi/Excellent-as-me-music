<template>
  <div class="favorite-item-wrapper">
    <span
      :class="{
        selected: select,
      }"
    ></span>
    <p>{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    select: Boolean, // 是否选中
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/myStyle.less";
.favorite-item-wrapper {
  padding: 15px 0;
  font-size: 14px;
  color: #222;
  cursor: pointer;
  &:hover {
    span {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAL5JREFUOBFjZACBVTelGb7/62ZgZHBg+P9fEixGLMHI+JzhP8MBBk6mUoYw9aeMEMP+nmFgYpgANGMRQ6zWc2LNAqtbfA3kgDiGfwwFDJzMJowMC68vY2D6fxFoUCdJBqErXnytnOEfoz4T2Jsgl1EOFkHMWnjtP+VmQU0AmsVENcOgBo0aSHmIjobhyAhDUHkGKYIo8y/IDKBZTODCEVSeUQ7iQGaxgEva78ACdvE1kJEUFrBMwAIWBKhYBQAAjRZDKb7Y9b8AAAAASUVORK5CYII=);
    }
    p {
      color: @blue;
    }
  }
  span {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 18px;
    vertical-align: middle;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAMZJREFUOBFjZACCY8cuSP/4+6ebkYHB4T8DgyRIjFgA1PMcqOcABzNLqZWVwVNGkGE///45w8DANIGZ898iOxOT58QaBlJ36MwZyb/fmeIYGP4VsDOzmDDuO3xmGSMD00VHW6NOUgxCV7v/8Lny/wz/9JlA3gS5DF0BqXyQGSCzGIAuBAYBdQDILCbqGIUwZdRARFiQyxoNQ3JDDqFvCIQhqDwDFUEIR5PHApkBMosJVDhCyjPyDILpApkBMov6BSzIBmpWAQCEVFxRmF8CTgAAAABJRU5ErkJggg==);
    &.selected {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeJJREFUOBGtlEsvA1EUx/932ppqGtUKiVdFRaQSsbITQYsFiS9g5RvYdG/rWxCJWEpIvFmIjYV0UxKPaIkmNFUqqi/j3Dud1nikU9xF5/bO/f/OOf879zDwsXjWgnxuDgyDUJRGsWb0h7EoFOzDZA5gqvOGqbBskPQuo4wf9sVhsvRKIrO/w3gMF2dJoswfQla8TJZJFXtWiNJTK2PG60K9bCrFJf/NpX/GZ/5GG1aHWyGbJPQ4ZUwfRotiqTgzOOlvqMbKkArjkng6r1NWBOyrs2KNMrOZVdlRLIXZYOx3wF4qbcPvRk2V6lkw/oqx7QiSubfKgV5HFbZG3HAWDuAkkcbIVgQPGT2Mk3Uld5PwdNKDdV9r8fQ67BZsE6zeqp7fRTIDP8HuP3mnpakDjrfY0eWQMdZsFxnxMndG29Bks4j9kecsfJth3KZymv7Lk2E+pGirHsrmeKK96JOiKGCMidfRlywGNsI4T2a17d8+dRleUgbju9d4KRitwWKvOVFmORiPoAPyhYO7FCb3rpHOq4YnMnlxAKHHDH9dduhK/ribX60J8nT56gk8c6ODYeHk9rf3+UsQ6o3UHKg5/tcgliQ6LV3Jf2BSgzUHJN62eacF2BJ9I6W2YTSC0JCWM4j1DpU/mpmyFApZAAAAAElFTkSuQmCC);
    }
  }
  p {
    display: inline-block;
    max-width: 220px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    font-size: 16px;
    transition: color 0.2s ease-in;
  }
}
</style>
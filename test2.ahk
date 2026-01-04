       Gui, Carregando:Destroy
       msg := LANGUAGE = "PT-BR" ? "é" : "it's"


   CheckTaskbarWidth() {
           Msgbox, 48,, % LANGUAGE = "PT-BR" ? "Detectado que a sua barra de tarefas est? na lateral da tela(" _w_ ").`n`n? necess?rio deixar a barra de tarefas no canto de baixo da tela para funcionar corretamente." : "Detected that your taskbar is on the side of the (" _w_ ").`n`nIt's needed to keep the taskbar in the bottom of the screen to work properly."
   }
